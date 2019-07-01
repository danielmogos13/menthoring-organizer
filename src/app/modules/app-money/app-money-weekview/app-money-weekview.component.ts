import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {OrganizerService} from '../../../services/organizerService/organizer.service';
import { LoadingSpinnerService } from '../../../services/loading-spinner/loading-spinner.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface dayOfWeekNode {
  name: string;
  children?: dayOfWeekNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  children: any
}

@Component({
  selector: 'app-money-weekview',
  templateUrl: './app-money-weekview.component.html',
  styleUrls: ['./app-money-weekview.component.scss']
})
export class AppMoneyWeekviewComponent implements OnInit, OnDestroy {
  treeControl: any;
  expandedNodes: any;
  dataSource: any;
  dateChangeEvent: any;
  getDataObservable: any;

  constructor(private organizerService: OrganizerService, private loadingSpinner: LoadingSpinnerService) { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  date: string;
  months: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days: any[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  weekDays: any = [];
  isLoading: boolean;

  ngOnInit() {

    this.loadingSpinner.isLoading.subscribe(loading => {
      this.isLoading = loading
    });

    this.organizerService.afterChange.subscribe(expenseAdded => {
      this.refreshTreeData(this.weekDays);
    });

    this.expandedNodes = [];

    this.dateChangeEvent = this.organizerService.currentDate.subscribe(date => {
      this.date = date;

      let dateArray = this.date.split("/");

      let day = dateArray[0];
      let month = dateArray[1];
      let year = dateArray[2];

      const actualDate = new Date(parseInt(year), parseInt(month), parseInt(day));
      let maximDays = new Date(parseInt(year), parseInt(month), 0).getDate();
      this.weekDays = [];

      for (let index: any = 0; index < 7; index++) {
        if(parseInt(day)+index <= maximDays){
          this.weekDays.push(
            {
              name: parseInt(day) + index + ' ' + this.months[parseInt(month) - 1] + ' ' + year,
              date: (parseInt(day) + index) + '/' + month +  '/' + year
            }
          );
        }else {
          let currentMonth = this.months[parseInt(month)];
          if(month === "12"){
            currentMonth = this.months[parseInt(month) - 1];
          }
          this.weekDays.push(
            {
              name:  index - (maximDays - parseInt(day)) + " " + currentMonth + " " + year,
              date: (index - (maximDays - parseInt(day))) + '/' + (parseInt(month) + 1) + '/' +  year
            }
          );
        }
      }

      this.updateTree(this.weekDays);
    });
  }

  refreshExpenses = () => {
    this.refreshTreeData(this.weekDays)
  };


  updateTree(weekdays) {

    const transformer = (node: dayOfWeekNode, level: number) => {
      return {
        children: node.children,
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
      };
    };

    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);


    const treeFlattener = new MatTreeFlattener(
      transformer, node => node.level, node => node.expandable, node => node.children);


    this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
    this.refreshTreeData(weekdays);
  }

  refreshTreeData = (weekdays) => {

    if(this.getDataObservable){
      this.getDataObservable.unsubscribe();
    }

    this.loadingSpinner.show();
    const url = 'http://localhost:3000/money';

    this.getDataObservable = this.organizerService.getWeekExpenses(url, weekdays).subscribe(response => {


      let dataNodes = this.treeControl.dataNodes;

      if(this.treeControl.dataNodes){
        for(let item = 0; item < dataNodes.length; item++){
          const currentNode = dataNodes[item];

          if( currentNode.expandable && this.treeControl.isExpanded(currentNode) ){
            this.expandedNodes.push(currentNode);
          }
        }
      }

      weekdays.map((weekItems, index) => {

        weekItems.children = [];

        // @ts-ignore
        for (let expenseIndex = 0; expenseIndex < response.data.length; expenseIndex++) {

          // @ts-ignore
          let dataItem = response.data[expenseIndex];
          // @ts-ignore
          dataItem.id = response.data[expenseIndex].id;

          // @ts-ignore
          let itemDate = new Date(dataItem.date);

          let year = itemDate.getFullYear();
          let month = itemDate.getMonth() + 1;
          let day = itemDate.getDate();

          let itemStringDate = day + '/' + month + '/' + year;

          if (itemStringDate === weekItems.date) {
            weekItems.children.push(dataItem);
          }
        }
      });


      this.dataSource.data = weekdays;

      let nodes = this.treeControl.dataNodes;

      for(let item = 0; item < nodes.length; item++){
        const currentNode = nodes[item];

        for(let expandedIndex = 0; expandedIndex < this.expandedNodes.length; expandedIndex++ ){
          const currentExpandedIndex = this.expandedNodes[expandedIndex];

          if( currentNode.name === currentExpandedIndex.name){
            this.treeControl.expand(currentNode);
          }

        }

      }

      this.loadingSpinner.hide();

    }, error => {
      this.isLoading = false;
    });


  };

  ngOnDestroy() {
    this.dateChangeEvent.unsubscribe();
  }

}
