import React, { Component } from  'react';
import axios from 'axios';
import './spacex.css';

class spacex extends Component{

    state = {
        posts: [],
        years:[],
        success_launch: false,
        success_land:false
    }

    componentDidMount(){
        axios.get("https://api.spacexdata.com/v3/launches?limit=100").then(response => {

            
            this.setState({posts: response.data});
            const arr = [];
            for(let i = 2006;i<=2020;i++){
                arr.push(i);
            }
            this.setState({years: arr});
            // console.log(this.state);
        })
        
    }
    clickEventHandler = function(ele){
        // console.log(ele);
        axios.get("https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year="+ele).then(response => {

            let finalData = response.data.filter(e=>{
                return e.launch_year == ele
            })
            this.setState({posts: finalData});
            console.log(this.state);    
        })
    }
    successLaunchHandler = function(ele){
        if(ele == true){
            this.setState({success_launch: true});
        }
        axios.get("https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success="+this.state.success_launch+"&amp;land_success="+this.state.success_launch).then(response => {

            let finalData = response.data.filter(e=>{
                return e.launch_success == ele
            })
            this.setState({posts: finalData});
            console.log(this.state);    
        })
    }
    // successLandHandler = function(ele){
    //     // success land event goes here
    //     console.log(ele);
    // }
    render(){

        let launchYears =  this.state.years.map(e => {
            return  <div className="element" key={e} onClick={()=>this.clickEventHandler(e)}>{e}</div>
        })
        
        let itemList = this.state.posts.map(e=>{
            return (
                <div className="item">
                        <div className="top">
                            <img src={e.links.mission_patch_small} />
                        </div>
                        <div className="top_container">
                            <div className="header_list">{e.mission_name}</div>
            <div className="list">Mission Ids: {e.mission_id[0]}</div>
            <div className="list">Launch Year:{e.launch_year}</div>
            <div className="list">Successful Launch:{e.launch_success.toString()}</div>
            <div className="list">Successful Landing:{e.land_success}</div>
                        </div>
                    </div>
            )
        })
        // let successfulLaunch  = 
        return (
            <div className="body">
                <div className="leftSide">
                    <div className="launchYear">launch year</div>
                    <div className="launchYearContainer">
                        {launchYears}
                    </div>
                    <div className="section">
                        <div className="launchYear">Successful Launch</div>
                        <div className="launchYearContainer">
                            <div className="element" onClick={() => this.successLaunchHandler(true)}>True</div>
                            <div className="element" onClick={() => this.successLaunchHandler(false)}>False</div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="launchYear">Successful Landing</div>
                        <div className="launchYearContainer">
                            <div className="element" onClick={() => this.successLandHandler(true)}>True</div>
                            <div className="element" onClick={() => this.successLandHandler(false)}>False</div>
                        </div>
                    </div>
                    
                </div>
                <div className="rightSide"> 
                <div className="developerCredentials">
                    Developer Name: Raja Ghosh
                </div>
                   
                    {itemList}
                </div>
            </div>
        )
    }
}

export default spacex;