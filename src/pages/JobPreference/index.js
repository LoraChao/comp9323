import './JobPreference.scss'
import { Layout, Card, List, Button, Space, Tag, Avatar} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function JobCheckButton(props){ 
    // get job's id
    const OfferId = props.OfferId 

    // jump with params: job's id
    // const navigate = useNavigate()
    function handleCheckJobClick(){
        window.open(`/check?offer_id=${OfferId}`, {replace: true})             
    }

    return (
       <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
     )
}

const JobPreference = () => {
    // get cookies
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        console.log(document.cookie)
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    // get current user's id using cookies
    const currUserId = getCookie('userid')

    // get user's id for checking
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    // apis
    const jobListURL = 'http://127.0.0.1:5000/offer/get/preferoffer/'+checkUserId
    

    const [data, setData ] = useState(0);

    // GET user's liked jobs
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getData = async (jobListURL) => {
            fetch(jobListURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setData(json)
            }) 
        }

        getData(jobListURL);
    },[])
    
    
    const jobList = data.output                                             
    //console.log(jobList)

    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Preferenced Jobs"
                    extra={<a href="./MyPage">Back</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        pagination={{
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 10,
                          }}
                        dataSource={jobList}                                  
                        renderItem={(item) => (
                        <List.Item
                            key={item.JobID}
                            >
                            <List.Item.Meta
                            // avatar={
                            //     <img width={80} alt="logo" 
                            //         src={jobPic}/>}
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/Org" />} />}
                                title={<a href="@">{item.CompanyName}</a>}
                                description={<Tag>{item.Requirement}</Tag>}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <JobCheckButton OfferId={item.OfferId} />
                            </Space>
                        </List.Item>
                        
                        )}
                    />
                        
                    </Card>   

                </Content>

                <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
            </Layout>
    )

};



export default JobPreference