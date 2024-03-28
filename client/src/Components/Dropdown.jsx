import React, { useState } from 'react'
import Select from 'react-select';

export default function Dropdown(props) {
    const [filterBy, setFilterBy] = useState('')


    var dropdownStyle = {
        borderStyle: 'solid none none none',
        borderRadius: '0%',
        padding: '0 10px 5px 40px',
        color: '#a09696',
        borderColor: 'grey',
        backgroundColor: 'rgba(0,0,0,0.3)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 54px 55px, rgba(0, 0, 0, 0.2) 0px -12px 30px, rgba(0, 0, 0, 0.5) 0px 4px 6px, rgba(0, 0, 0, 0.5) 0px 12px 28px, rgba(0, 0, 0, 0.5) 0px 3px 5px'
    }

    // function handleCLick(value) {
    //     // let targetValue = event.target.value;
    //     // let value = ''

    //     // if(targetValue === 'Popularity')  value = 'popularity'
    //     // else if(targetValue === 'Relevance')  value = 'relevancy'
    //     // else  value = 'publishedAt'

    //     console.log(value);

    //     props.setLoading(false);
    //     props.setSortBy(value);
    // }

    const filterOptions = [
        { label: 'Relevancy', value: 'relevancy' },
        { label: 'Popularity', value: 'popularity' },
        { label: 'Published Time', value: 'publishedAt' },
    ];

    const handleSelectChange = (selectedOption) => {
        setFilterBy(selectedOption.value);
        props.setLoading(false);
        props.setSortBy(selectedOption.value);

        console.log(selectedOption.value);
    };

    return (
        <div style={{ textAlign: 'right', padding: '10px 0px' }}>
            <Select
                label='select'
                name="filter"
                options={filterOptions}
                onChange={handleSelectChange}
                value={filterOptions.find((option) => option.value === filterBy)}
                styles={{
                    singleValue: (base) => ({ ...base, color: "white" }),
                    valueContainer: (base) => ({
                        ...base,
                        // background: colourOptions[2].color,
                        //placeholder color
                        color: "hotpink"
                    }),
                    control: (base, state) => ({
                        ...base,
                        background: "#121212"
                    })
                }}
                theme={(theme) => ({
                    ...theme,
                    // borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        /*
                         * control/backgroundColor
                         * menu/backgroundColor
                         * option/color(selected)
                         */
                        // neutral0: "black",

                        neutral30: "white", //control/borderColor(focused)
                        // neutral10: "grey",
                        neutral80: "white", //input color
                        primary25: "#ccc", //option bg color focued
                        primary: "black", //option bg color selected
                        primary50: "white", // option bg color active(enavled or available)
                        neutral90: "hotpink"
                    }
                })}
            />

            {/* <div className="btn-group" >
                <button type="button" className="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={dropdownStyle} >
                    Sort By
                </button>
                <ul className="dropdown-menu" data-bs-theme="dark">
                    <li><span className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={handleCLick('popularity')} >
                        <span className="d-inline-block bg-success rounded-circle p-1"></span>
                        Popularity
                    </span></li>
                    <li><span className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={handleCLick('relevancy')} >
                        <span className="d-inline-block bg-primary rounded-circle p-1"></span>
                        Relevance
                    </span></li>
                    <li><span className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={handleCLick('publishedAt')} >
                        <span className="d-inline-block bg-danger rounded-circle p-1"></span>
                        Published Time
                    </span></li>

                </ul>
            </div> */}
        </div>
    )
}
