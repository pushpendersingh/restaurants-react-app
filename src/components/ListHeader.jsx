import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

class ListHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.onSerach = this.onSerach.bind(this);
      this.onSortChange = this.onSortChange.bind(this);
      this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    onSerach(e){
      this.props.onSearch(e.target.value);
    }
    handleFilterChange(e){
      this.setState({value: e.target.value});
      this.props.onFilter(e.target.value);
    }
    onSortChange(e){
      this.props.onSort(e);
    }
    render() {
      const restros = this.props.restaurants;
      const uniqueCuisines= this.props.uniqueCuisines;
      const cuisinesOptions = uniqueCuisines.map((cuisine) =>
         <option key={cuisine} value={cuisine}>{cuisine}</option>
      );
        return (
          <div className="d-md-flex d-block justify-content-between align-items-center mt-4 mt-lg-5 ">
            <h3 className="mb-2 font-weight-bolder">Restaurants <span className="font-weight-light">({restros.length})</span></h3>

            <div className="d-md-flex d-block align-items-end mb-2">
              <form className="form-inline my-2 my-md-0 mr-0 mr-sm-3">
                <input  className="search form-control w-100" type="search" placeholder="Search by name"  onChange={this.onSerach} aria-label="Search"/>
              </form>
              <form className="form-inline mt-3 mt-md-0 ">
                <select className="custom-select mr-0 mr-sm-3" value={this.state.value} onChange={this.handleFilterChange}>
                  <option key="" value="">Filter by cuisine</option>
                  {cuisinesOptions}
                </select>
              </form>
              <Dropdown className="mt-3 mt-md-0">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Sort by
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="ratehigh" onSelect={this.onSortChange}>Rating High - Low</Dropdown.Item>
                  <Dropdown.Item eventKey="ratelow" onSelect={this.onSortChange}>Rating Low - High</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="votehigh" onSelect={this.onSortChange}>Votes High - Low</Dropdown.Item>
                  <Dropdown.Item eventKey="votelow" onSelect={this.onSortChange}>Votes High - Low</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="costhigh" onSelect={this.onSortChange}>Cost High - Low</Dropdown.Item>
                  <Dropdown.Item eventKey="costlow" onSelect={this.onSortChange}>Cost Low - Low</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>
          </div>
        )
    }
}

export default ListHeader
