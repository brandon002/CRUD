import React, {useState, useEffect} from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { editPost } from "../action/PostActions.js";
import { useNavigate } from "react-router-dom";
const EditItem = props => {
    const {
        editPost
    } = props
    const navigate = useNavigate()
    const param = useParams()
    console.log(param);
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
    useEffect(() => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
                'item_id':  param.id
            }
          }));
    }, [])

    const handleSubmit = () =>{
        editPost(formState.values.item_id, formState, navigate)
    }

    return(
        <>
            <div className='row mb-3 mx-4 '>
                <div className="col">
                    
                    <div>
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="">Item Id</label>
                                    <input 
                                        disabled
                                        autoFocus
                                        className="form-control input-default"
                                        margin="dense"
                                        id="id"
                                        name="item_id"
                                        value={formState.values.item_id|| ''}
                                        onChange = {handleChange}
                    
                                        fullWidth
                                    />
                                 
                                </div>
                            </div>
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
                                       
                                        fullWidth
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
                    
                                        fullWidth
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

export default connect(mapStateToProps,{ editPost })(EditItem)