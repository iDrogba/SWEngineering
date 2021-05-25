import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Event(props) {
    const {event} = props;
    return (
        <div key={event._id} className="card">
        <Link to={`/event/${event._id}`}>
                <img className="medium" src={event.image} alt={event.name} />
                </Link>
                <div className="card-body">
                <Link to={`/event/${event._id}`}>
                    <h2>{event.name}</h2>
                </Link>
                    <Rating rating={event.rating} numReviews={event.numReviews}></Rating>
                <div className="price">${event.price}</div>
            </div>
        </div>
    )
}