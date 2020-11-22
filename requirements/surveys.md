# Listar Esquetes

❌ ✅

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/surveys**
2. ✅ Valida se a requisição foi feita por um usuario
3. ✅ Retorna 200 com os dados da enquete
3. ✅ Retorna 204 se não tiver nenhuma enquete.

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o usuário não for usuario
3. ✅ Retorna erro **500** se der erro ao tentar criar a enquete
