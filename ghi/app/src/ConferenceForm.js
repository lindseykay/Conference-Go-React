import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            name: "",
            starts: "",
            ends: "",
            description: "",
            maxPresentations: "",
            maxAttendees: "",
            locations: []
        };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
    this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
    this.handleLocationChange= this.handleLocationChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);

          const cleared = {
            name: "",
            starts: "",
            ends: "",
            description: "",
            maxPresentations: "",
            maxAttendees: "",
            location: "",
            };
          this.setState(cleared);
        }

    }

    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartChange(event){
        const value = event.target.value;
        this.setState({starts: value})
    }

    handleEndChange(event) {
        const value = event.target.value;
        this.setState({ends: value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({maxPresentations: value})
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maxAttendees: value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    }


    async componentDidMount() {
        const url = "http://localhost:8000/api/locations/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({locations: data.locations})
        }
    }

    render () {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                             <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartChange} value={this.state.starts} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                                <label htmlFor="starts">Starts</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndChange} value={this.state.ends} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                                <label htmlFor="ends">Ends</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={this.handleDescriptionChange} value={this.state.description} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxPresentationsChange} value={this.state.maxPresentations} placeholder="Maximum" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                                <label htmlFor="Maximum presentations">Maximum presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleMaxAttendeesChange} value={this.state.maxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                                <label htmlFor="max_attendees">Maximum attendees</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleLocationChange} value={this.state.location} required name="location" id="location" className="form-select">
                                <option value="">Choose a location</option>
                                {this.state.locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    )
                                })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConferenceForm;
