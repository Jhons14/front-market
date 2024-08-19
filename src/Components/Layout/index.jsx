function Layout({ children }) {
  const layerStyle = {
    marginTop: '55px',
  };
  return <div style={layerStyle}>{children}</div>;
}

export default Layout;
