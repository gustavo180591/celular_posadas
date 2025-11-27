# Documentación de la API

## Autenticación
```json
{
  "Authorization": "Bearer tu_token_aqui"
}
```

## Endpoints

### Obtener Productos
- **URL**: `/api/products`
- **Método**: `GET`
- **Parámetros**:
  - `category` (opcional): Filtrar por categoría
  - `minPrice` (opcional): Precio mínimo
  - `maxPrice` (opcional): Precio máximo

### Ejemplo de Respuesta
```json
{
  "data": [
    {
      "id": "s23-ultra",
      "name": "Samsung Galaxy S23 Ultra",
      "price": 820000,
      "condition": "like_new",
      "stock": 5
    }
  ]
}
```
