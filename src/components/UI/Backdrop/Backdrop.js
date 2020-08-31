import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default Backdrop;

// import React from 'react';

// import classes from './Backdrop.css';

// const backdrop = (props) => (
//     props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
// );

// export default backdrop;