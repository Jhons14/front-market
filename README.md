# Gestor de ventas (POS)

Una herramienta que permite gestionar las ventas y contabilidad de un comercio.

## Descripción

Este proyecto esta construiddo por 3 elementos principales, la interfaz de usuario que esta desarrollado principalmebnte las tecnologias Vite, Node.JS y React.JS.

Por otro lado existe el servidor encargado conectar la base de datos con la interfaz por medio peticiones REST que se encargaran de realizar las consultas solicitadas por el usuario desde la interfaz.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Jhons14/front-market.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd front-market
   ```
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno:
   ```bash
    cp .env.example .env
   ```
5. Configura las variables de entorno:
   ```bash
    npm run DEV
   ```
The frontend should now be running on http://localhost:5173.

## Usage

### Access the System

1. **Login:**
   - Open your browser and navigate to `http://localhost:3000`.
   - Use the default admin credentials to log in:
     - **Email:** `admin@example.com`
     - **Password:** `admin123`

2. **Dashboard:**
   - After logging in, you will be taken to the dashboard, where you can view sales stats, manage inventory, and more.

3. **Sales:**
   - Navigate to the "Sales" section to process transactions. Add items to the cart, apply discounts, and complete the sale.

4. **Inventory Management:**
   - Go to the "Inventory" section to view, add, or update products in stock.

5. **Customer Management:**
   - In the "Customers" section, manage customer information and view purchase history.

6. **Reports:**
   - Generate sales, inventory, and customer reports in the "Reports" section.

## Contributing

We welcome contributions! To contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature`).
3. **Make your changes.**
4. **Commit your changes** (`git commit -m 'Add some feature'`).
5. **Push to the branch** (`git push origin feature/your-feature`).
6. **Open a Pull Request.**

Please make sure your code adheres to the coding conventions and standards used in the project.

## License

This project is licensed under the MIT License 

## Authors

- **Jhon Orjuela** - *Initial work* - [Jhon's GitHub](https://github.com/Jhons14)

## Acknowledgments
- This project was inspired by the needs of small retail businesses to have an affordable and efficient POS system.
