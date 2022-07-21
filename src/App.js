import './App.css';
import React from 'react';
import axios from 'axios';
import TableRow from './components/tableRow/TableRow';
import './styles.css'
import InfoWrapper from './components/infoWrapper/InfoWrapper';

class App extends React.PureComponent{

  constructor(){
    super()
    this.state = {
      userData : [],
      searchQuery : '',
      filteredUser: [],
      activeRowId : '',
      activeRowIndex: 2,
      activeRowData: ''
    }
    console.log('Constructor called')
  }

  componentDidMount(){
    console.log('Component Did Mount Called')
    axios.get('https://admin-panel-data-edyoda-sourav.herokuapp.com/admin/data')
    .then((res)=>{
      this.setState({
        userData : res.data,
        activeRowId: res.data[this.state.activeRowIndex].id,
        activeRowData: res.data[this.state.activeRowIndex]
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  getSearchValue = (e) => {
    console.log(this)
    let filteredUser = this.state.userData.filter((user)=>{
      if(user.firstName.toLowerCase().includes(e.target.value.toLowerCase())){
        return true
      }
    })
    this.setState({
      searchQuery: e.target.value,
      filteredUser
    })
  }

  handleSelectedRow = (id) => {
    let selectedRowRecords = this.state.userData.findIndex(user=>user.id == id)
    this.setState({
      activeRowId: id,
      activeRowData: this.state.userData[selectedRowRecords]
    })
  }

  componentDidUpdate(){
    console.log('Component Did Update called')
  }

  render(){
    console.log('Render Called')
    return(
      <div>
        <main>
          <div id="table-section">
              <form action="/">
                  <input 
                    type="text" 
                    placeholder="Enter something" 
                    name="search-box" 
                    id="search-box" 
                    onChange = {this.getSearchValue}
                    value={this.state.searchQuery}
                  />
              </form>

              <div id="table-wrapper">

                  <div id="table-headers">
                      <table>
                          <thead>
                              <tr>
                                  <th className="column1">Id</th>
                                  <th className="column2">FirstName</th>
                                  <th className="column3">LastName</th>
                                  <th className="column4">Email</th>
                                  <th className="column5">Phone</th>
                              </tr>
                          </thead>
                      </table>
                  </div>

                  <div id="table-data">
                      <table>
                          <tbody>
                            {
                              // this.state.userData.map((user)=><TableRow data = {user}/>)
                              this.state.filteredUser.length === 0 && this.state.searchQuery === '' ? 
                              this.state.userData.map((user,idx)=>
                              <TableRow 
                                key = {idx}
                                data = {user} 
                                handleSelectedRow = {this.handleSelectedRow}
                                selectedRow = {this.state.activeRowId}
                              />):
                              this.state.filteredUser.map((user,idx)=>
                              <TableRow 
                                key = {idx}
                                data = {user}
                                handleSelectedRow = {this.handleSelectedRow}
                                selectedRow = {this.state.activeRowId}
                              />)
                            }
                          </tbody>
                      </table>
                  </div>

              </div>

          </div>

          {this.state.activeRowData && <InfoWrapper
            activeRowData = {this.state.activeRowData}
          />}

          </main>
      </div>
    )
  }
}

export default App;