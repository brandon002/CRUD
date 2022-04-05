import React, {useEffect}from 'react';
import Posts from './Posts.jsx';
import { getPost } from '../action/PostActions.js';
import { connect } from 'react-redux';
import Loading from '../Loading.jsx';
import BelajarPagination from './BelajarPagination';
const Home = props =>{

    const { 
        getPost,
        PostReducer: {
            items,
            loading
        }
    } = props
    useEffect(() => {
        getPost()
    },[])
 
    return(
        <>
        {items === null || loading ? <Loading/>
            :<div className="my-5 mx-5 w-75">
                {/* <Posts 
                items={items}
                loading={loading}  /> */}
                <BelajarPagination 
                items={items}
                loading={loading}  />
            </div>}
            
        </>
    )
}

const mapStateToProps = state => ({
   PostReducer: state.PostReducer
});

export default connect(mapStateToProps,{ getPost })(Home);