import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import AdHeader from './components/AdHeader';
import SearchFilter from './components/SearchFilter';
import logo from "./images/down.avif";

const Home = () => {
  return (
    <>
      <AdHeader />

      <div
        style={{
          position: 'fixed',
          top: 130,
          left: 0,
          width: '13%',
          height: '100vh',
          zIndex: 0, // Lower z-index for sidebars
        }}
      >
        <img
          src={logo}
          alt=""
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'none',
            paddingRight:"10px"
          }}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: 130,
          right: 0,
          width: '13%',
          height: '100vh',
          // background: '#dcdcdc',
          zIndex: 0, // Lower z-index for sidebars
        }}
      >
        <img
          src={logo}
          alt=""
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'none',
            paddingLeft:"10px"

          }}
        />
      </div>

      <React.Fragment >
        <CssBaseline />
        <Container fixed>
          <h2 className='text-secondary mx-3 mt-5'><strong>Filter Result</strong></h2>
          <div>
            <SearchFilter />
          </div>
        </Container>
      </React.Fragment>
    </>
  );
}

export default Home;
