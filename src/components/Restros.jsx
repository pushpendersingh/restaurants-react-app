import React, { Component } from 'react'
import ListHeader from './ListHeader'
import List from './List'
import Papa from 'papaparse'
import File from './restaurants.csv'
import { Container } from 'react-bootstrap';

class Restros extends Component {
    constructor(props) {
      super(props);
      this.state = {restaurants:[],
        restaurantsBackup:[],
        uniqueCuisines:[],
        search:'',
        filter:'',
        sort:''
      };
      this.onSearchChange = this.onSearchChange.bind(this);
      this.onFilterChange = this.onFilterChange.bind(this);
      this.onSortChange = this.onSortChange.bind(this);
    }

    componentDidMount = async () => {
      await Papa.parse(File, {
          download: true,
          header: true,
        	complete: function(results) {
            //last empty record
            results.data.pop();
            this.setState(state => ({
              restaurants: results.data,
              restaurantsBackup: results.data
            }));

            //to list unique cuisines
            const uniqueCuisines = [];
            results.data.forEach(restro => {
              if(restro.Cuisines){
                const aCuisines = restro.Cuisines.split(', ');
                aCuisines.forEach(cuisine =>{
                  if (uniqueCuisines.indexOf(cuisine) === -1) {
                      uniqueCuisines.push(cuisine);
                  }
                })
              }
            });
            this.setState(state => ({
              uniqueCuisines:uniqueCuisines
            }));

        	}.bind(this)
        });

    }

    onSearchChange(searchText){
      this.filterList(searchText,this.state.filter);
    }

    filterList(search,filter){
      var newList=[];
      const currentList = this.state.restaurantsBackup;
      if (search && filter) {
        newList = this.filter(search,"RestaurantName",currentList);
        newList = this.filter(filter,"Cuisines",newList);
      }else if(search){
        newList = this.filter(search,"RestaurantName",currentList);
      }else if(filter){
        newList = this.filter(filter,"Cuisines",currentList);
      }else{
          newList = currentList;
      }
      if(this.state.sort){
        this.decideSortField(this.state.sort);
      }
      this.setState({
        restaurants: newList,
        search:search,
        filter:filter
      });
    }
    
    onFilterChange(filterText){
      this.filterList(this.state.search,filterText);
    }

    filter(text,field,list){
      var newList=[];
      if(text){
        newList = list.filter(item => {
          const lc = item[field].toLowerCase();
          const filter = text.toLowerCase();
          return lc.includes(filter);
        });
        return newList;
      }else{
        return list;
      }
    }

    decideSortField(input){
      switch(input) {
        case "ratehigh":
          this.sort("high","AggregateRating");
          break;
        case "ratelow":
          this.sort("low","AggregateRating");
            break;
        case "votehigh":
          this.sort("high","Votes");
            break;
        case "votelow":
          this.sort("low","Votes");
            break;
        case "costhigh":
          this.sort("high","AverageCostfortwo");
            break;
        case "costlow":
          this.sort("low","AverageCostfortwo");
            break;
        default:
          console.log("wrong sorting key");
      }
    }

    onSortChange(input){
      this.setState({
        sort:input
      });
      this.decideSortField(input);
    }

    sort(order,fieldname){
      var currentList = this.state.restaurants;
      if(order === "high"){
        currentList.sort(function(a, b) {
          return b[fieldname] - a[fieldname];
        });
      }else{
        currentList.sort(function(a, b) {
          return a[fieldname] - b[fieldname];
        });
      }
      this.setState({
        restaurants: currentList
      });
    }

    render() {
        return (
              <Container>
                <ListHeader restaurants={this.state.restaurants}
                uniqueCuisines={this.state.uniqueCuisines}
                onSort={this.onSortChange}
                onSearch={this.onSearchChange}
                onFilter={this.onFilterChange}/>
                <List restaurants={this.state.restaurants}/>
              </Container>
        )
    }
}

export default Restros
