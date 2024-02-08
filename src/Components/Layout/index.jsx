function Layout({ children }) {
  const layerStyle = {
    marginTop: '80px',
  };
  return <div style={layerStyle}>{children}</div>;
}

export default Layout;
