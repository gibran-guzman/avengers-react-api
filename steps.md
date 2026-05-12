# Roadmap de Implementación

Este documento traduce las instrucciones del proyecto en una secuencia de commits atómicos. El objetivo es avanzar de forma incremental, validando cada capa antes de pasar a la siguiente, sin mezclar UI, estado, acceso a datos y calidad.

## Criterio General

Cada paso debe cumplir estas reglas:
- Un commit, una intención principal.
- Cambios pequeños y verificables.
- Sin mezclar refactor con nuevas funcionalidades salvo que el refactor sea un prerrequisito inmediato.
- Mantener siempre el código en inglés.

## Roadmap de Commits Atómicos

Cada paso incluye un mensaje sugerido en formato Conventional Commits. La idea es que cada commit represente una unidad de cambio pequeña, trazable y fácil de revisar.

## Fase 1: Base

### 1. `chore(project): bootstrap React, TypeScript and Vite`
- Inicializar el proyecto con React, TypeScript y Vite.
- Configurar estructura base de carpetas según la arquitectura feature-based.
- Definir `tsconfig`, `eslint`, `prettier` y scripts mínimos de calidad.
- Dejar el proyecto compilable sin lógica de negocio.

### 2. `chore(env): add environment contract and validation`
- Crear `.env.example` con las variables requeridas.
- Implementar validación de variables de entorno en tiempo de arranque.
- Documentar el propósito de cada variable y el enfoque de configuración.

### 3. `chore(lib): add shared HTTP foundation`
- Crear el cliente HTTP centralizado.
- Encapsular base URL, timeouts y manejo común de errores.
- Preparar utilidades técnicas reutilizables para la capa de datos.

## Fase 2: Core

### 4. `feat(avengers): define domain models and API DTOs`
- Definir los tipos internos del dominio Avengers.
- Definir los DTOs de respuesta del API.
- Separar claramente tipos externos de tipos consumidos por UI.

### 5. `refactor(avengers): add data mappers and normalization`
- Implementar transformaciones de DTO a modelo de dominio.
- Normalizar campos opcionales, imágenes rotas y datos incompletos.
- Mantener la lógica de normalización fuera de componentes y hooks.

### 6. `feat(avengers-api): isolate Avengers API access`
- Crear funciones puras de acceso al API en `features/avengers/api`.
- Encapsular endpoints de listado, detalle y búsqueda.
- Evitar cualquier llamada directa al API desde la UI.

### 7. `feat(avengers-services): add domain service layer`
- Crear servicios orientados al negocio sobre la capa API.
- Centralizar reglas de composición, parámetros y respuestas normalizadas.
- Mantener la UI desacoplada de detalles del backend.

### 8. `feat(avengers-query): integrate TanStack Query hooks`
- Crear hooks de consulta para listado y detalle.
- Definir query keys estables y reutilizables.
- Diferenciar estados de carga inicial, refresco y error.

### 9. `feat(avengers-search): implement controlled search behavior`
- Implementar búsqueda por nombre con debounce si el API se consulta en vivo.
- Mantener la lógica de búsqueda en hooks o servicios, no en componentes visuales.
- Asegurar que el estado de búsqueda sea predecible y testeable.

### 10. `feat(avengers-filters): add API-driven filters`
- Implementar filtros basados en campos reales del API.
- Mantener filtros serializables y fáciles de combinar con la búsqueda.
- Evitar duplicación de lógica entre listado y estados derivados.

### 11. `feat(favorites): add lightweight favorites state`
- Definir la estrategia de favoritos con Zustand o un hook/store acotado.
- Implementar alta, baja y persistencia si aplica.
- Mantener el estado global al mínimo indispensable.

### 12. `feat(routing): configure application routes`
- Configurar React Router.
- Definir rutas para listado, detalle, favoritos y not found.
- Preparar carga diferida de páginas cuando aporte valor.

## Fase 3: UI

### 13. `feat(layout): create application shell`
- Crear el shell principal con header, contenedor y estructura base.
- Mantener la navegación clara, responsiva y accesible.
- Evitar que el layout dependa de features concretas.

### 14. `feat(ui): add reusable base components`
- Crear botones, inputs, cards, badges y contenedores reutilizables.
- Mantenerlos genéricos y libres de lógica de Avengers.
- Asegurar consistencia visual y accesibilidad básica.

### 15. `feat(feedback): add loading empty and error states`
- Crear loaders, skeletons, empty states y error states reutilizables.
- Separar feedback técnico de feedback de negocio.
- Preparar estados visuales consistentes para toda la app.

### 16. `feat(error-boundary): add global application fallback`
- Añadir un límite de error a nivel aplicación.
- Mostrar fallos controlados sin exponer stack traces.
- Preparar una fallback UI consistente con el sistema visual.

### 17. `fix(errors): normalize API and UI error handling`
- Unificar mensajes para timeout, red, rate limit, not found y desconocido.
- Separar diagnóstico técnico de texto visible para el usuario.
- Reutilizar la misma estrategia en hooks, servicios y UI.

### 18. `feat(avengers-page): build Avengers listing page`
- Implementar la página principal de listado.
- Orquestar búsqueda, filtros, carga, error y éxito.
- Mantener la página como coordinadora, no como contenedor de lógica pesada.

### 19. `feat(avenger-card): add character summary card`
- Crear el componente `AvengerCard`.
- Mostrar campos resumidos con fallback seguro para imagen y texto.
- Mantener la tarjeta simple, reutilizable y testeable.

### 20. `feat(avengers-grid): render character collections`
- Crear el contenedor visual del listado.
- Gestionar claves estables y estados vacíos.
- Evitar lógica de datos dentro del componente de render.

### 21. `feat(avengers-toolbar): connect search and filters UI`
- Crear `AvengersToolbar` con entrada de búsqueda y controles de filtro.
- Conectar la UI con el estado del hook o del contenedor de página.
- Asegurar usabilidad con teclado y foco visible.

### 22. `feat(avenger-details): build character details page`
- Implementar la vista de detalle del Avengers seleccionado.
- Cargar datos por id y manejar carga, vacío y error.
- Mantener el detalle desacoplado del listado.

### 23. `feat(avenger-details-panel): add detailed character view`
- Crear una presentación clara del personaje con datos completos.
- Incluir manejo seguro de imágenes, textos faltantes y metadatos.
- Mantener el componente puro y orientado a props.

### 24. `feat(favorites-page): build favorites page`
- Construir la vista de favoritos.
- Reutilizar componentes existentes de listado y tarjetas.
- Asegurar comportamiento coherente con el estado local o global.

### 25. `feat(not-found): add navigation fallback views`
- Implementar la vista not found.
- Asegurar rutas inválidas y estados de navegación claros.
- Mantener un mensaje comprensible para el usuario.

### 26. `fix(a11y): improve semantics and keyboard support`
- Revisar landmarks, jerarquía de títulos y labels accesibles.
- Asegurar operabilidad por teclado y foco visible.
- Corregir alt text, contraste y tamaños táctiles.

### 27. `style(ui): refine responsive layouts and visuals`
- Ajustar layouts para móvil, tablet y desktop.
- Optimizar loading states, skeletons y fallback de imágenes.
- Mantener coherencia visual entre páginas y componentes.

### 28. `feat(favorites): persist and synchronize favorites`
- Definir si los favoritos se persisten localmente.
- Añadir sincronización segura entre sesiones si aplica.
- Verificar que añadir y quitar favoritos no rompa el listado ni el detalle.

## Fase 4: Tests

### 29. `test(avengers): cover mappers and data normalization`
- Cubrir normalización de datos y transformaciones críticas.
- Validar casos con campos faltantes o datos inválidos.
- Mantener tests pequeños y focalizados.

### 30. `test(avengers): cover hooks and query behavior`
- Probar comportamiento de hooks de búsqueda, listado y detalle.
- Cubrir estados de éxito, error y vacío.
- Mantener mocks del API controlados y explícitos.

### 31. `test(ui): cover critical components and feedback states`
- Probar renderizado de estados principales en listado, detalle y feedback.
- Verificar accesibilidad básica donde aporte valor.
- Cubrir interacción de favoritos en UI.

### 32. `test(integration): validate main Avengers user flows`
- Validar listado exitoso, búsqueda, filtros, vacío, error, detalle y favoritos.
- Simular respuestas mockeadas del API para los flujos principales.
- Mantener estos tests como red de seguridad final.

## Fase 5: Cierre

### 33. `chore(quality): enforce lint test build and typecheck`
- Ejecutar y corregir `npm run lint`.
- Ejecutar y corregir `npm run test`.
- Ejecutar y corregir `npm run build`.
- Confirmar que también pasa el type checking estricto.

### 34. `docs(readme): finalize project documentation`
- Completar el README con overview, stack, setup, variables, scripts y arquitectura.
- Documentar decisiones técnicas principales y mejoras futuras.
- Dejar instrucciones claras para mantenimiento y evolución.

## Secuencia Recomendada

El orden ideal es:
1. Base.
2. Core.
3. UI.
4. Tests.
5. Cierre.

## Resultado Esperado

Si se sigue este plan, cada commit quedará enfocado en una sola responsabilidad y el proyecto avanzará desde la infraestructura hasta la entrega final sin saltos grandes de complejidad.