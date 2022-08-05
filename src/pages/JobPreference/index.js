import './JobPreference.scss'
import { Layout, Card, List, Button, Space, Tag} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const jobPic = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"


function JobCheckButton(props){ 
    
    const OfferId = props.OfferId 
    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')


    const navigate = useNavigate()
    function handleCheckJobClick(){
       navigate(`/check?currUserId=${currUserId}&offer_id=${OfferId}`, {replace: true})             
    }

    return (
       <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
     )
}

const JobPreference = () => {

    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')
    //console.log("user id: ", currUserId)

    const jobListURL = 'http://127.0.0.1:5000/offer/preferoffer/'+currUserId
    

    const [data, setData ] = useState(0);

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
                            avatar={
                                <img width={80} alt="logo" 
                                    src={jobPic}/>}
                                title={<a href="@">{item.CompanyName}</a>}
                                //description={item.description}
                                description={<Tag>{item.Requirement}</Tag>}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                {/* <div><Button href={item.JobLink}>Check</Button></div> */}
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