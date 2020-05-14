import React, { Component } from 'react'
import { Card ,Row, Col} from 'react-bootstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.formatColor = this.formatColor.bind(this);
  }

  formatColor(colorName){
    var className ="text-dark";
    if(colorName){
      switch(colorName.toLowerCase()) {
        case "dark green":
          className= "text-dark-green"
          break;
        case "green":
            className= "text-green"
            break;
        case "yellow":
            className= "text-yellow"
            break;
        case "orange":
            className= "text-orange"
            break;
        case "red":
            className= "text-red"
            break;
        default:
          className="text-dark"
      }
    }
    return className;
  }
    render() {
        const restaurants = this.props.restaurants;
        const listItems = restaurants.map((restro) =>
          <Col className="mb-3">
            <Card className="h-100">
              <Card.Img variant="top" src="https://static.euronews.com/articles/stories/04/60/38/82/773x435_cmsv2_becaff49-2b06-5659-9cd3-a6eeefadcde4-4603882.jpg" />
              <Card.Body>
                <Card.Title className="mb-2">{restro.RestaurantName}</Card.Title>
                <div className=" h6">({restro.Cuisines})</div>
                <div className=" small font-weight-normal">{restro.AverageCostfortwo} for two</div>
                <div className="small font-weight-normal">{restro.HasTablebooking==="Yes"?"Table Booking Available":''}</div>
                <div className="small font-weight-normal">{restro.HasOnlineDelivery==="Yes"?"Online Delivery Available":''}</div>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between font-weight-bolder">
                  <div className=""><span className={this.formatColor(restro.RatingColor)}>{restro.AggregateRating} ({restro.RatingText})</span></div>
                  <div className="font-weight-light text-gray">({restro.Votes} Votes)</div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        );
        return (
          <div className="content pt-3">
            <Row xs={1} md={2} lg={3}>
              {listItems}
            </Row>
          </div>
        )
    }
}

export default List
