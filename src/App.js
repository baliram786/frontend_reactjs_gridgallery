import React, { Component } from "react";
// import GridLayout from 'react-grid-layout';
// import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import DemoComponent from "./components/demoComponent";
// import sampleItems from "./sampleItems";
import AddItemPopUp from "./components/popups/AddItemPopup";
import ImagePopup from "./components/popups/ImagePopup";
import GridLayout from 'react-grid-layout';
// import { Responsive, WidthProvider } from "react-grid-layout";
// const ResponsiveGridLayout = WidthProvider(Responsive);
import axios from "axios";

export default class App extends Component {

    state = {
        isImagePopupVisible: false,
        isNewCardPopupVisible: false,
        isDeleteCardItemVisible: false,
        url: "",
        layouts: [], 
        records : []
    }

    constructor() {
        super();

        this.onlayoutChanged = this.onlayoutChanged.bind(this);
        this.loadData()
    }

    loadData() {
        axios
            .get("http://localhost:8000/cards/all")
            .then(response => {
                this.setState({records : response.data})
                console.log(response.data)
                // this.state.records.map(record => {
                //     console.log(record.title)
                // })
                this.calculateLayouts()
            })
            .catch(err => {
                alert(err.message)
            })
    }

    calculateLayouts() {
        var w = 2, h = 5, cols = 2
        var indexer = 0, incr_line = 0
        var arr = []

        this.state.records.map(item => {
            item = {
                i: item.id, x: w * indexer, y: incr_line, w: w, h: h
            }

            arr.push(item)

            if (cols === indexer) {
                indexer = 0
                incr_line += 1
            } else {
                indexer += 1
            }
        })

        this.setState({ layouts: arr})
        console.log(this.state.layouts)
    }

    onlayoutChanged = (layout, layouts) => {
        // console.log(layout)
    }

    toggleNewCardItemPopup = () => {
        this.setState({
            isNewCardPopupVisible: !this.state.isNewCardPopupVisible
        })
    }

    toggleImagePopup = () => {
        this.setState({
            isImagePopupVisible: !this.state.isImagePopupVisible
        })
    }

    toggleDeleteCardItemTrigger = () => {
        this.setState({
            isDeleteCardItemVisible: !this.state.isDeleteCardItemVisible
        })
    }

    addNewItem = (item) => {
        item = {
            id: item.id,
            position: item.position,
            thumbnail: item.thumbnail,
            title: item.title,
            slug_type: item.slug_type
        }

        this.setState(prevState => ({
            records : [...prevState.records , item]
        }));

        this.calculateLayouts()
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>

                <button type="button" class="btn btn-primary" onClick={this.toggleNewCardItemPopup}>Add Card</button> &nbsp;
                <button type="button" class="btn btn-danger" onClick={this.deleteCardItem}>Delete Card</button>

                {this.state.isNewCardPopupVisible ? <AddItemPopUp position={this.state.records.length + 1} toggle={this.toggleNewCardItemPopup} trigger={this.addNewItem} /> : null}
                {this.state.isImagePopupVisible ? <ImagePopup url={this.state.url} toggle={this.toggleImagePopup} /> : null}

                {/* <ResponsiveGridLayout
                    onLayoutChange={this.onlayoutChanged}
                    style={{ margin: 30 }}
                    className="layout"
                    layouts={this.state.layouts}
                    breakpoints={{ lg: 1200 }}
                    cols={{ lg: 12 }}
                    rowHeight={180}
                    width={1200} > */}

                { this.state.records.length != 0? 
                <GridLayout
                    className="layout"
                    cols={9}
                    onLayoutChange={this.onlayoutChanged}
                    layout={this.state.layouts}
                    rowHeight={30}
                    width={800}>

                    {/* running loop for every item  */}
                    {
                        this.state.records.map(item => {
                            return (
                                <div key={item.id}>
                                    <DemoComponent
                                        item={item}
                                        onClick={() => {
                                            this.setState({ url: item.thumbnail })
                                            this.toggleImagePopup()
                                        }} />
                                </div>
                            )
                        })
                    }

                    {/* </ResponsiveGridLayout> */}
                </GridLayout>
                :
                <div style={{margin: 50}}>
                    <img src="https://static.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_2x.jpg" width="300" height="300" /> 
                </div>
                }
            </div>
        );
    }
}