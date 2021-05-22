import React, { useRef, useState, useEffect } from 'react';
import SimpleNav from "./components/Nav";
import Article from "./components/Article";
import Slide from "./components/Slide";
import SimpleCard from "./components/Card";
import Returns from "./components/Returns";
import Heatmap from "./components/Heatmap";
import Cosmos from "./components/Cosmos";
import Radial from "./components/Radial";
import Tree from "./components/Tree";
import Congress from "./components/Congress";

import christmas from "./images/christmas.jpg";

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: (myRef.current.offsetWidth) < 1000 ? myRef.current.offsetWidth : 1000,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

function App(props) {
  const ref = useRef(null);
  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef);

  const interactives = [
    {id: "interactive-0", interactive: <Heatmap width = {width}/>},
    {id: "interactive-1", interactive: <Returns width = {width}/>},
    {id: "interactive-2", interactive: <Cosmos width = {width}/>},
    {id: "interactive-3", interactive: <Radial width = {width}/>},
    {id: "interactive-4", interactive: <Congress width = {width}/>},
    {id: "interactive-5", interactive: <Tree width = {width}/>}
  ]

  const ArticleList = props.articles.map(article => (
    <Col className="col-md-6 p-2">
      <SimpleCard 
        id = {article.id}
        image = {article.image}
        title = {article.title}
        date = {article.date}
        description = {article.description}
        link = {article.link}
      />
    </Col>
    )
  );

  const ChartList = props.charts.map(chart => (
    <Col className="col-md-6 p-2">
      <SimpleCard 
        id = {chart.id}
        image = {chart.image}
        title = {chart.title}
        date = {chart.date}
        description = {chart.description}
        link = {chart.link}
      />
    </Col>
    )
  );

  const InteractiveList = interactives.map(interact => (
    <Row className="p-2">
      <Col ref={componentRef}>
        <Article chart={interact.interactive}/>
      </Col>
    </Row>
    )
  );

  const handleClick = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <SimpleNav />
        </Col>
      </Row>
      <Row className="full-height">
        <Col sm={4} className="pt-5 pb-5 pl-5 my-auto">
          <Image src={christmas} alt="profile" fluid />
        </Col>
        <Col sm={8} className="p-5 my-auto">
          <h1>Hello, world! I'm Shuai Hao.</h1>
          <p>I am a journalist, programmer and designer. I graduated from Columbia University's dual degree program in Journalism and Computer Science</p>
          <Button variant="primary" onClick={handleClick}>Portfolios</Button>{' '}
        </Col>
      </Row>
      <div ref={ref}></div>
      <Tabs className="justify-content-center sticky" defaultActiveKey="Interactives" id="uncontrolled-tab-example">
        <Tab eventKey="Interactives" title="Interactives">
          {InteractiveList}
        </Tab>
        <Tab eventKey="Charts" title="Charts">
          <Row className="p-2">
            <Col>
              <Slide data={props.slides}/>
            </Col>
          </Row>
          <Row className="p-2">
            {ChartList}
          </Row>
        </Tab>
        <Tab eventKey="Articles" title="Articles">
          <Row className="p-2">
            {ArticleList}
          </Row>
        </Tab>
      </Tabs>
      <Row className="m-2 p-3 text-center footer">
        <Col>
          <footer>
            <p>Designed using React and Bootstrap</p>
            <p>Email: <a href="mailto:shuai_hao@outlook.com">shuai_hao@outlook.com</a></p>
            <p>All Content © 2021 Shuai Hao</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

// class ReadyToScroll extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }
//   render() {
//     return <div ref={this.myRef}>Element to scroll to</div>;
//   }

//   executeScroll = () => this.myRef.current.scrollIntoView();
//   // run this method to execute scrolling.
// }

export default App;
