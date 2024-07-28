function Layout({ children }) {
  const layerStyle = {
    marginTop: '92px',
  };
  return <div style={layerStyle}>{children}</div>;
}

export default Layout;
