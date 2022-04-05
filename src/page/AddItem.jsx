import React, {useState, useEffect} from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { createPost } from "../action/PostActions.js";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddItem = props => {
    const {
        createPost
        
    }=props
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        values: {},
    });
    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: 
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
        }));
    };
    console.log(formState);
    // useEffect(() => {
    //     setFormState(formState => ({
    //         ...formState,
    //         values: {
    //           ...formState.values,
    //             'kode_product':  upperCharTrim +"-"+timeNow+':'+milisecon+'-'+randomAlphaNum
    //         }
    //       }));
    // }, [])

    const handleSubmit = () =>{
        createPost(formState, navigate)
    }

    return(
        <>
            <div className='row mb-3 mx-4 '>
                <div className="col">
                    
                    <div>
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="">Title</label>
                                    <input 
                                        
                                        autoFocus
                                        className="form-control input-default"
                                        margin="dense"
                                        id="title"
                                        placeholder="Title"
                                        name="item_title"
                                        value={formState.values.item_title|| ''}
                                        onChange = {handleChange}
                                       
                                        
                                    />
                                
                                </div>
                            </div>
                           
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="">Body</label>
                                    <input 
                                        autoFocus
                                        className="form-control input-default"
                                        margin="dense"
                                        id="body"
                                        placeholder="Body"
                                        name="item_body"
                                        value={formState.values.item_body || ''}
                                        onChange={handleChange}
                    
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <Button variant="dark" className='btn mr-3 btn-sm w-25' > Kembali </Button> */}
                        <Button variant="primary" className='btn mr-3 btn-sm btn-block'
                        onClick={handleSubmit}
                        > Submit Item </Button>
                    </div>
                </div>
            </div>
        </>
         
    )
}

const mapStateToProps = state => ({
    PostReducer: state.PostReducer,
})

export default connect(mapStateToProps,{ createPost })(AddItem)