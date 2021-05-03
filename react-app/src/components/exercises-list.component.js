import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ExerciseItem = props => (
   <tr>
        <th scope="row">{props.exercise._id}</th>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to= {"/edit/"+ props.exercise._id}>Edit</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id) }>Delete</a> 
        </td>
  </tr>
)

export default class ExercisesList extends Component {
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises : []};

    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({exercises : response.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
    exercisesList() {
      return this.state.exercises.map(currentexercises => {
          return <ExerciseItem exercise = {currentexercises} deleteExercise= {this.deleteExercise} key = {currentexercises._id} />
      })
    }
    deleteExercise(id){
        debugger
        axios.delete("http://localhost:5000/exercises/"+ id +"")
        .then(response => {
            console.log(response.data)
            debugger;
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    render(){
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.exercisesList()}
                </tbody>
            </table>
        );
    }
}