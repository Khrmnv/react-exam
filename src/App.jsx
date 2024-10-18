import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store'; 
import { Breadcrumb, Layout, Menu, Button, Spin } from 'antd';
import { toggleTheme } from './store/themeSlice'; 

const Welcome = lazy(() => import('./components/Welcome'));
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const location = useLocation();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const getBreadcrumbName = () => {
    switch (location.pathname) {
      case '/':
        return 'Welcome';
      case '/home':
        return 'Home';
      case '/about':
        return 'About';
      case '/experience':
        return 'Experience';
      case '/skills':
        return 'Skills';
      case '/projects':
        return 'Projects';
      default:
        return '';
    }
  };

  return (
    <Layout style={{ background: isDarkMode ? '#001529' : '#fff' }}>
      <Header style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="demo-logo" />
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={['Home', 'About', 'Experience', 'Skills', 'Projects'].map((key) => ({
            key: key.toLowerCase(),
            label: <Link to={`/${key.toLowerCase()}`}>{key}</Link>,
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button onClick={handleThemeToggle} style={{ marginLeft: '16px' }}>
          {isDarkMode ? 'Светлая тема' : 'Темная тема'}
        </Button>
      </Header>
      <Content style={{ padding: '0 24px', flex: 1 }}>
        <Breadcrumb className={isDarkMode ? 'breadcrumb-light' : 'breadcrumb-dark'} style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">Добро пожаловать</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{getBreadcrumbName()}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            minHeight: 'calc(100vh - 150px)',
          }}
        >
          <Sider width={200}>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
              <Menu.Item key="1">
                <Link to="/">Welcome</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/experience">Experience</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/skills">Skills</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/projects">Projects</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 150px)' }}>
            <Suspense fallback={<Spin size="large" />}>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Kakhramanov Murad ©{new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default WrappedApp;