import React, {useEffect} from 'react';
import './App.css';
import * as axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import dropdown from "./actions/dropdown";
// import dropdownReducer from "./reducers/dropdown_reducer";
import Cases from "./actions/Cases";
import stateAction from "./actions/stateAction";
import {CardBody, CardTitle, CardText} from "reactstrap";
import stateReducer from "./reducers/stateReducer";
import worldData from "./actions/worldData";


function App() {
    const dispatch = useDispatch();
    let ans;
    let arr = [];
    arr[0]="Select Country";
    let totalCases;
    let recovered;
    let deaths;
    let worlddata;

    useEffect(async () => {
        await axios.get('https://restcountries.eu/rest/v2/all').then(res => ans = (res.data));
        await ans.map((props) => {
            arr.push(props.name)
        });

        await axios.get('https://api.covid19api.com/world/total').
        then(res=>worlddata=res.data);

        dispatch(worldData({totalConfirmed:worlddata.TotalConfirmed,totalDeaths:worlddata.TotalDeaths,totalRecovered:worlddata.TotalRecovered}));


        dispatch(dropdown({data: arr}));
        // console.log(arr);
    }, [])

    let value = useSelector(store => store.dropdownReducer);
    let countries = (value.data);




    const variable=useSelector(state=>state.worldReducer);

    let countryData = useSelector(store => store.CasesReducer);
    let stateStatus = useSelector(store =>store.stateReducer);



   async function selectStates() {
        let stateData;
        let data = document.getElementById("stateDropdown").value;
        let url = "http://covid19-india-adhikansh.herokuapp.com/state/" + data;
        await axios.get(url).then(res => stateData= res.data);

        stateData=stateData.data;

        dispatch(stateAction({ type:"stateCases",active:stateData[0].active, cured:stateData[0].cured,
            death:stateData[0].death,stateName:data}));

    }

    async function selectCountries() {

        let country = document.getElementById('countryDropdown').value;
        let url = "https://api.covid19api.com/total/country/" + country;


        await axios.get(url).then(res => {
            let dataObject = res.data;
            let status = dataObject[dataObject.length - 1];
            // console.log(status);
            if (dataObject.length !== 0) {
                totalCases = status.Confirmed;
                recovered = status.Recovered;
                deaths = status.Deaths;
                console.log(deaths);
            } else {
                totalCases = "0";
                recovered = "0";
                deaths = "0";
            }

        });
        dispatch(Cases({totalCases: totalCases, recovered: recovered, deaths: deaths,countryName:country}));

        const dropList=document.getElementById("countryDropdown");
        // dropList.remove();

        const county=document.getElementById("country");
        if(county!==null)
             county.appendChild(dropList);

        if (country === "India"){
            console.log("inside india");
            let status = document.getElementById("stateDropdown");
            status.style.display="block";
            // status.remove();


            // status.setAttribute("hidden","false");
            // console.log(status);
        }
        else
        {
            let status = document.getElementById("stateDropdown");
            let countystatus = document.getElementById("statecard");
            if(status!==null &&countystatus!==null) {
                status.style.display = "none";
                countystatus.style.display="none";
            }

        }

    }


    return (

        <div className="App">
            <h1>Covid-19 Updates</h1>
            {/*{console.log(countries)}*/}


            <CardBody className={"card"}>
                <CardTitle className={"text"}>World Data</CardTitle>
                <table className={"table"}>

                    <tr>
                        <th  className={"text"}>Total Cases </th>
                        <th  className={"text"}>Total Recovered</th>
                        <th className={"text"}>Total Deaths</th>
                    </tr>

                    <tr>
                        <td>{variable.totalConfirmed}</td>
                        <td>{variable.totalRecovered}</td>
                        <td>{variable.totalDeaths}</td>
                    </tr>

                </table>
                {/*<CardText>TotalCases::</CardText>*/}
                {/*<CardText>TotalDeath::</CardText>*/}
                {/*<CardText>TotalRecovered::</CardText>*/}
            </CardBody>


            <div className={"dropdown"}>

                <select id={"countryDropdown"} className={"countryDropdown"} onChange={selectCountries} >
                    {countries !== undefined && countries.map((props) => <option>{props}</option>)}
                </select>


                <select id={"stateDropdown"} className={"stateDropdown"} onChange={selectStates} style={{display:"none"}}>
                    <option defaultValue={"Select State"}>Select State</option>
                    <option value={"Andhra Pradesh"}>Andhra Pradesh</option>
                    <option value={"Arunachal Pradesh"}>Arunachal Pradesh</option>
                    <option value={"Assam"}>Assam</option>
                    <option value={"Bihar"}>Bihar</option>
                    <option value={"Chhattisgarh"}>Chhattisgarh</option>
                    <option value={"Goa"}>Goa</option>
                    <option value={"Gujarat"}>Gujarat</option>
                    <option value={"Haryana"}>Haryana</option>
                    <option value={"Himachal Pradesh"}>Himachal Pradesh</option>
                    <option value={"Jharkhand"}>Jharkhand</option>
                    <option value={"Karnataka"}>Karnataka</option>
                    <option value={"Kerala"}>Kerala</option>
                    <option value={"Madhya Pradesh"}>Madhya Pradesh</option>
                    <option value={"Maharashtra"}>Maharashtra</option>
                    <option value={"Manipur"}>Manipur</option>
                    <option value={"Meghalaya"}>Meghalaya</option>
                    <option value={"Mizoram"}>Mizoram</option>
                    <option value={"Nagaland"}>Nagaland</option>
                    <option value={"Odisha"}>Odisha</option>
                    <option value={"Punjab"}>Punjab</option>
                    <option value={"Rajasthan"}>Rajasthan</option>
                    <option value={"Sikkim"}>Sikkim</option>
                    <option value={"Tamil Nadu"}>Tamil Nadu</option>
                    <option value={"Telangana"}>Telangana</option>
                    <option value={"Tripura"}>Tripura</option>
                    <option value={"Uttar Pradesh"}>Uttar Pradesh</option>
                    <option value={"Uttarakhand"}>Uttarakhand</option>
                    <option value={"West Bengal"}>West Bengal</option>
                </select>


                {/*{console.log("Data Restored= ",countryData)}*/}

                {/*{console.log(countryData.length + "  " + countryData.totalCases )}*/}

                {countryData.length !== 0 && countryData.totalCases !== undefined &&
                <CardBody className={"card"} id={"country"}>
                    {/*{console.log('there')}*/}
                    <CardTitle className={"text"}>{countryData.countryName}</CardTitle>


                    <table className={"table"}>

                        <tr>
                            <th  className={"text"}>Total Cases </th>
                            <th  className={"text"}>Total Recovered</th>
                            <th className={"text"}>Total Deaths</th>
                        </tr>

                        <tr>
                            <td>{countryData.totalCases}</td>
                            <td>{countryData.recovered}</td>
                            <td>{countryData.deaths}</td>
                        </tr>

                    </table>

                </CardBody>
                }

                {stateStatus.length !== 0 && stateStatus.active !== undefined &&
                <CardBody id={"statecard"} className={"statecard"} >
                    {/*{console.log('there')}*/}
                    <CardTitle className={"text"}>{stateStatus.stateName}</CardTitle>


                    <table className={"table"}>

                        <tr>
                            <th  className={"text"}>Total Cases </th>
                            <th  className={"text"}>Total Recovered</th>
                            <th className={"text"}>Total Deaths</th>
                        </tr>

                        <tr>
                            <td>{stateStatus.active}</td>
                            <td>{stateStatus.cured}</td>
                            <td>{stateStatus.death}</td>
                        </tr>

                    </table>

                </CardBody>
                }


            </div>


        </div>
    );
}

export default App;
