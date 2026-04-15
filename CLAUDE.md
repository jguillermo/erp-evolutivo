# CLAUDE.md

Este documento describe el modelo de negocio completo de ERP Evolutivo + IA Asesora, el estado actual del proyecto y las convenciones técnicas del repositorio. Sirve como contexto permanente para Claude Code y para cualquier persona que necesite entender el negocio de forma integral.

---

## Estado Actual del Proyecto (Abril 2026)

ERP Evolutivo se encuentra en **fase de exploración y análisis de viabilidad**. No existe código de producto real; lo único construido hasta hoy es la visualización interactiva del modelo de negocio que contiene este repositorio (una aplicación Angular con cinco tabs que presentan la visión del producto a stakeholders).

**Guillermo** es el fundador único. Su perfil es técnico: experto en desarrollo de software e inteligencia artificial. Cuenta con capital semilla disponible para financiar el desarrollo del MVP.

En cuanto a validación de mercado, se han realizado conversaciones iniciales con bodegas locales en Lima. Se confirmó que la herramienta actual que usan es Excel. El canal de distribución a través de contadores aliados es todavía una hipótesis sin confirmar: no hay alianzas cerradas. Los precios tampoco están validados con usuarios reales.

La visión de IA a largo plazo es construir modelos fine-tuned con datos propios de PYMEs. En la primera fase, la IA funcionará con prompting estructurado sobre APIs externas (OpenAI / Anthropic).

---

## La Empresa

### Qué es ERP Evolutivo

ERP Evolutivo es un sistema de gestión empresarial modular, impulsado por inteligencia artificial, diseñado específicamente para micro y pequeñas empresas (PYMEs) en Latinoamérica, con arranque en Lima, Perú.

Su diferencial central es el concepto de **evolución progresiva**: el usuario comienza gratis con lo mínimo necesario para operar su negocio y va desbloqueando nuevas funcionalidades (llamadas "ramas") de forma gradual, conforme su negocio crece y las necesita. La mecánica es análoga a la de un videojuego de estrategia: el usuario empieza con recursos básicos y desbloquea herramientas conforme avanza de nivel. Esta analogía no es arbitraria — los dueños de PYMEs jóvenes crecieron jugando videojuegos y entienden intuitivamente la lógica de niveles, logros y progresión, lo que reduce drásticamente la curva de adopción de un ERP.

Integrado al sistema hay un asesor de inteligencia artificial que actúa como un consultor de negocio disponible 24/7, especializado en el sector y la etapa de madurez del usuario. Este asesor no da respuestas genéricas: entiende el contexto específico del negocio, compara con empresas similares y sugiere acciones concretas.

### El problema que resuelve

Las PYMEs en Latinoamérica gestionan su negocio con libretas, hojas de Excel y WhatsApp. Cuando intentan profesionalizarse, se enfrentan a un dilema sin buena solución:

- **Las herramientas simples no escalan.** Excel funciona hasta cierto punto, pero no factura, no controla inventario en tiempo real, no genera reportes automáticos y no alerta sobre problemas del negocio.

- **Los ERPs tradicionales son inaccesibles.** Sistemas como Odoo, SAP Business One o S10 requieren un implementador externo, semanas o meses de capacitación, y un pago mensual fijo por un paquete de funciones que el usuario promedio no aprovecha ni al 20%. El resultado es que la mayoría de PYMEs los contrata, no los usa y termina volviendo a Excel.

- **Los ERPs para PYMEs de la región (Alegra, Bsale, Contapyme) ofrecen paquetes fijos** que no se adaptan al crecimiento orgánico de un negocio que puede pasar de 1 a 15 empleados en dos años.

ERP Evolutivo resuelve este dilema ofreciendo solo lo que el negocio necesita hoy, con un sistema inteligente que detecta cuándo está listo para el siguiente paso y se lo propone en el momento correcto. El usuario nunca ve funcionalidades que no necesita. Nunca paga por lo que no usa.

### Por qué ahora

Hay cuatro fuerzas convergentes que hacen que este sea el momento correcto para lanzar ERP Evolutivo. Ninguna de ellas existía con esta intensidad hace tres años:

**La obligación fiscal digital se está expandiendo.** SUNAT está ampliando progresivamente el mandato de facturación electrónica a negocios cada vez más pequeños. Lo que antes era opcional para una bodega, se está convirtiendo en obligatorio. Esto crea una necesidad urgente y no opcional de digitalizar al menos la facturación, lo que representa un punto de entrada natural para el producto. El bodeguero no elige digitalizarse por convicción: lo hace porque si no, no puede operar legalmente. ERP Evolutivo convierte esa obligación en una oportunidad de digitalización integral.

**Los pagos digitales ya son mainstream en bodegas.** La adopción de Yape y Plin se aceleró dramáticamente desde 2022. Hoy incluso los negocios más pequeños de Lima aceptan pagos digitales. Esto significa que el flujo de datos transaccionales ya existe de forma digital en la vida cotidiana del bodeguero, y un sistema que integre ese flujo con facturación e inventario ofrece un salto de valor evidente, no abstracto.

**El costo de la IA cayó un orden de magnitud.** Hace dos años, ofrecer un asistente de IA personalizado a un micro-empresario que paga S/ 30/mes habría sido económicamente inviable. Hoy, con modelos ligeros que funcionan offline para la capa básica y costos de API que se redujeron más del 90% desde 2023, la IA como feature incluida (no como producto premium) es viable financieramente.

**La generación de emprendedores actuales creció con videojuegos.** Los dueños de bodegas y pequeños negocios de 25 a 45 años entienden intuitivamente la mecánica de niveles, logros y progresión. Un ERP que usa esa lógica reduce la barrera psicológica de adopción de forma que no habría sido posible con la generación anterior de empresarios.

### Posicionamiento competitivo detallado

Frente a **libreta y Excel**, ERP Evolutivo ofrece digitalización sin trauma: el registro es gratuito, el onboarding se completa en menos de 10 minutos sin soporte humano, y el sistema guía al usuario paso a paso desde su primera venta.

Frente a **Odoo**, que es el ERP open-source más conocido en LATAM, la diferencia es estructural. Odoo cobra entre S/ 70 y S/ 200 mensuales por un paquete fijo de módulos. Requiere configuración técnica inicial, a menudo con un implementador certificado. Su interfaz está diseñada para usuarios con experiencia en sistemas empresariales. Y no tiene IA asesora integrada: cualquier capacidad de inteligencia artificial es un módulo adicional de pago. ERP Evolutivo elimina las tres barreras: no hay configuración técnica, no hay paquete fijo, y la IA viene incluida desde el primer día.

Frente a **SAP Business One y S10**, no hay implementador, no hay meses de capacitación, no hay costos de consultoría que pueden superar los S/ 10,000 solo en setup. Estos sistemas están diseñados para empresas de 50+ empleados y su complejidad es desproporcionada para una bodega.

Frente a **Alegra** (el competidor regional más directo), la diferencia principal es el modelo de crecimiento. Alegra cobra desde aproximadamente S/ 15/mes por un plan fijo con funcionalidades estáticas. Si el negocio crece y necesita más, debe saltar a un plan superior que incluye funciones que quizás no necesita. No tiene sistema de progresión adaptativa ni IA asesora. Su fortaleza es que ya está establecido y tiene base de usuarios en Colombia y Perú. Su debilidad es que ofrece la misma experiencia el primer día que el día 365: no se adapta al crecimiento del usuario.

Frente a **Bsale**, que opera principalmente en Chile y Perú con foco en punto de venta y facturación electrónica, la diferencia es el alcance. Bsale resuelve bien el problema de facturación y POS pero no ofrece un camino de crecimiento hacia inventario avanzado, gestión de equipo, finanzas o analítica. Es una solución de punto, no un sistema que evoluciona.

---

## El Mercado

### Dimensión del mercado

**TAM (mercado total direccionable):** En Perú hay aproximadamente 2.3 millones de micro y pequeñas empresas formales (fuente: INEI). Si se asume un ingreso promedio potencial de S/ 60/mes por empresa (punto medio del rango S/ 29-199), el TAM peruano es de aproximadamente S/ 1,656 millones anuales (alrededor de USD 440 millones). Expandido a los cuatro mercados objetivo (Perú, Colombia, México, Chile), donde la densidad de PYMEs es similar o mayor, el TAM regional supera los USD 3,000 millones anuales.

**SAM (mercado alcanzable):** Limitando al segmento que tiene dolor demostrable (usa libreta o Excel, tiene obligación de facturar electrónicamente, está en zona urbana con acceso a internet), el SAM en Lima se reduce a aproximadamente 500,000 micro-empresas. A S/ 60/mes promedio, esto representa S/ 360 millones anuales (USD 95 millones) solo en Lima.

**SOM (mercado obtenible en los primeros 3 años):** Con un equipo pequeño, distribución vía contadores y crecimiento orgánico, una meta realista es capturar entre 2,000 y 5,000 usuarios activos de pago en los primeros tres años. A un ARPU (ingreso promedio por usuario) de S/ 50/mes, esto representa entre S/ 1.2 y S/ 3 millones anuales de ingresos recurrentes (USD 320K - 800K ARR).

Estos números son estimaciones basadas en datos públicos y deben refinarse con investigación de campo más profunda.

### A quién va dirigido

ERP Evolutivo apunta a un modelo B2SMB (business to small & micro business) donde el dueño del negocio es simultáneamente el usuario y el pagador. No hay un departamento de compras ni un director de IT: la persona que toma la decisión, la que usa el sistema y la que paga son la misma.

**Mercado geográfico:** Perú primero (Lima como punto de lanzamiento), con expansión posterior a Colombia, México y Chile, países con alta densidad de PYMEs y regulación fiscal electrónica similar.

### Segmento de lanzamiento (beachhead)

El primer segmento a conquistar son los **negocios de 1 a 3 personas en Lima** que hoy gestionan con libreta o Excel. Su dolor más inmediato y concreto es doble: no saben cuánto vendieron realmente al final del día, y no pueden facturar electrónicamente a SUNAT (obligación fiscal creciente en Perú).

Dentro de este perfil, los tres sub-segmentos prioritarios son:

- **Bodegas y comercios minoristas.** Hay más de 400,000 solo en Lima. Tienen alta frecuencia de transacciones diarias, un dolor claro (descontrol de ventas e inventario) y una decisión de compra rápida porque el dueño es el único decisor. Este es el segmento donde se concentra toda la energía de lanzamiento.

- **Peluquerías, barberías y spas.** Necesitan gestionar agenda y cobros. La decisión de adopción es igualmente rápida porque el local es pequeño y el dueño opera directamente.

- **Emprendedores unipersonales.** Están dando sus primeras ventas y necesitan orden sin complejidad. Son early adopters naturales de herramientas digitales.

### Expansión progresiva del mercado

En la segunda fase, el producto se expande a **negocios de 4 a 15 personas** que ya probaron algún sistema y lo abandonaron porque era demasiado complejo o demasiado rígido. Necesitan gestión de inventario, equipo y finanzas. Los sectores prioritarios son restaurantes y food service, servicios profesionales, y pequeños productores y talleres.

En la tercera fase, se aborda el **mercado medio de 16 a 50 personas** con múltiples locales que necesitan integración entre sedes, analítica avanzada y predicción. Aquí entran distribuidores y mayoristas, constructoras pequeñas y agronegocios.

---

## El Producto

### Núcleo gratuito

Todo usuario comienza con un núcleo base que es gratuito de forma permanente. Este núcleo incluye registro de ventas, inventario simple, facturación básica compatible con SUNAT, un dashboard de resumen del negocio, acceso desde cualquier dispositivo vía web responsive, y la IA asesora en su nivel básico (tres consultas diarias, tips contextuales por sector y alertas básicas de negocio).

Este núcleo no es un "trial" ni un freemium con fecha de vencimiento. Es el punto de entrada permanente del producto. El valor que entrega es suficiente para que una bodega opere su día a día. La monetización ocurre cuando el negocio crece y necesita más.

### Las nueve ramas evolutivas

El sistema está organizado en nueve ramas funcionales que se activan de forma independiente según la necesidad real del negocio. Cada rama tiene entre tres y cinco niveles internos de madurez:

- **Equipo** — Gestión de personal, nómina, turnos, permisos. Se activa cuando el negocio contrata su primer empleado.
- **Ventas** — Punto de venta avanzado, cotizaciones, CRM básico. Evoluciona desde el registro simple del núcleo.
- **Locaciones** — Gestión multi-sede, transferencias entre locales, reportes consolidados. Se activa cuando el negocio abre un segundo punto.
- **Inventario** — Stock avanzado, órdenes de compra, gestión de proveedores, alertas de reposición. Evoluciona desde el inventario simple del núcleo.
- **Finanzas** — Contabilidad, flujo de caja, reportes tributarios, conciliación bancaria. Se activa cuando el volumen de operaciones lo justifica.
- **Clientes** — Fidelización, historial de compras, segmentación, campañas. Se activa cuando la base de clientes crece lo suficiente.
- **Digital** — E-commerce, presencia online, catálogo digital, integración con marketplaces. Se activa cuando el negocio quiere vender por internet.
- **Analítica** — Business intelligence, dashboards avanzados, predicción de demanda. Se activa cuando hay suficientes datos históricos para que el análisis sea útil.
- **Producción** — Manufactura, control de procesos, calidad, costos de producción. Se activa para negocios que fabrican o transforman productos.

Cada negocio traza su propio camino de crecimiento activando solo las ramas que necesita. Un restaurante típicamente activa Equipo y Locaciones. Una tienda online activa Inventario y Digital. Una distribuidora activa Inventario, Finanzas y Analítica. No hay un paquete predefinido: el sistema se adapta al negocio, no al revés.

### Sistema de activación inteligente (triggers)

El motor de triggers es el mecanismo que conecta el crecimiento real del negocio con el desbloqueo de nuevas funcionalidades. Opera monitoreando métricas del negocio (cantidad de transacciones, volumen de ventas, número de empleados, diversidad de productos) y, cuando detecta que una condición se cumple, propone la activación de la rama correspondiente.

Existen cuatro modos de activación con distinto nivel de intervención del usuario:

- **Automático:** El sistema detecta la condición y activa la funcionalidad sin intervención. Se usa para mejoras menores o configuraciones que no implican costo.
- **Sugerido:** El sistema detecta la condición y notifica al usuario con una explicación contextual de por qué debería activar esa rama. El usuario decide. Este es el modo principal.
- **Manual:** El usuario activa la rama cuando lo desee, sin esperar a que el sistema lo sugiera. Garantiza control total.
- **Inteligencia artificial:** La IA asesora analiza el contexto completo del negocio y recomienda la activación con una justificación estratégica personalizada. Por ejemplo: "Tu negocio ya tiene 3 empleados y el mes pasado gastaste 12 horas en planillas manuales. Activar la rama Equipo te ahorraría aproximadamente 8 horas mensuales."

### La IA Asesora

La IA asesora es uno de los pilares centrales del producto. No es un chatbot genérico: es un sistema de inteligencia artificial entrenado con datos específicos de PYMEs que entiende el sector, la ubicación, la etapa de madurez y el contexto particular de cada negocio.

La IA opera en tres dimensiones:

**Dimensión predictiva.** Anticipa lo que probablemente ocurrirá en el negocio basándose en patrones observados en empresas similares. Ejemplo: "Empresas de tu tamaño en tu sector que superan los S/ 15,000 mensuales en ventas contratan a su primer empleado en las siguientes 4 semanas. Tu facturación actual es S/ 13,800."

**Dimensión estratégica.** Cuando el usuario enfrenta una decisión, la IA presenta opciones concretas rankeadas por probabilidad de éxito según datos de negocios comparables. Ejemplo: "Para aumentar tus ventas este mes, aquí tienes 4 estrategias ordenadas por tasa de éxito en bodegas de tu zona: (1) bundle de productos complementarios, (2) horario extendido los sábados..."

**Dimensión comparativa.** Permite al usuario saber dónde está parado respecto a negocios similares en su sector, ciudad y etapa. Ejemplo: "Tu margen bruto es 32%. El promedio de restaurantes de tu tamaño en Lima es 38%. La diferencia principal está en el costo de insumos."

La IA evoluciona junto con el plan del usuario en cuatro niveles:

- **IA Básica (gratuita, incluida en el núcleo).** Tres consultas diarias, tips contextuales por sector, alertas básicas de negocio. Funciona offline con modelos ligeros, sin costo operativo significativo.

- **IA Estratégica (plan Crecimiento).** Consultas ilimitadas, opciones rankeadas por probabilidad de éxito, benchmark contra negocios similares, alertas inteligentes proactivas, reporte semanal automatizado del negocio.

- **IA Predictiva (plan Empresa).** Todo lo anterior más predicciones de demanda, simulaciones de escenarios ("¿Qué pasaría si abro un segundo local?"), y detección temprana de riesgos financieros u operativos.

- **IA Ejecutiva (plan Corporativo).** Todo lo anterior más optimización multi-sede, modelos financieros avanzados, análisis competitivo del mercado local, modelo de IA entrenado específicamente para el sector del usuario, y acceso vía API para integraciones personalizadas.

El efecto de red es clave: cuantas más empresas usan el sistema, más datos anónimos se acumulan, lo que permite un fine-tuning más preciso del modelo de IA, que a su vez genera mejores recomendaciones, que ayudan a las empresas a crecer más, lo que incrementa la retención y atrae nuevos usuarios. Este flywheel es la barrera competitiva más difícil de replicar a mediano plazo.

---

## Modelo de Ingresos

### Principio de pricing: pago por uso real

El modelo de ingresos se basa en un principio fundamental: **si no usas, no pagas**. No hay suscripciones mensuales fijas. El usuario paga exclusivamente por los módulos (ramas) que utiliza efectivamente en cada período. Si un mes no utiliza ningún módulo de pago, su factura es cero. Si utiliza una rama, paga por una. Si utiliza tres, paga por tres.

Este modelo se distingue radicalmente de la competencia, donde el estándar es cobrar un plan fijo mensual independientemente del uso real. Para el perfil de usuario objetivo (micro y pequeño empresario que es cauteloso con gastos fijos), la eliminación del compromiso mensual reduce la barrera de entrada de forma significativa.

El núcleo del producto (ventas básicas, inventario simple, facturación SUNAT, dashboard) es gratuito de forma permanente. La IA básica también es gratuita siempre, funcionando offline sin costo operativo relevante. Estas dos decisiones garantizan que el usuario obtiene valor real sin pagar nada, y que la conversión a pago ocurre de forma orgánica cuando el negocio genuinamente necesita más funcionalidad.

### Opciones de métrica de uso (decisión pendiente)

Definir qué constituye "uso" de un módulo es la decisión técnica-comercial más importante antes de construir el MVP. A continuación se presentan tres opciones con sus ventajas y desventajas, para evaluar y validar con usuarios reales:

**Opción A: Cobro por transacciones procesadas.** Se cobra un monto fijo por cada transacción que pasa por un módulo de pago (por ejemplo, cada registro de nómina en la rama Equipo, cada orden de compra en Inventario avanzado). Es el modelo más justo desde la perspectiva del usuario porque paga exactamente por lo que produce. Sin embargo, tiene tres problemas: la arquitectura de billing es compleja (cada módulo necesita su propio contador de eventos), el usuario puede percibir ansiedad por transacción ("me cuesta cada vez que hago algo"), y los ingresos son muy difíciles de predecir.

**Opción B: Cobro por días activos del módulo.** Se cobra proporcionalmente a los días del mes en que el usuario accedió a funcionalidades de una rama de pago. Si usó la rama Equipo 15 de 30 días, paga el 50% del precio mensual de esa rama. Es más simple de implementar que la opción A y más fácil de comunicar al usuario. El riesgo es que incentiva al usuario a concentrar tareas en pocos días para pagar menos, lo que va en contra del objetivo de que use el sistema continuamente.

**Opción C: Activación mensual con umbral mínimo.** La rama se considera "activa" (y se cobra completa) si el usuario la usa al menos N veces en el mes. Si no la usa, no paga. Es el modelo más simple de implementar y comunicar: "si usaste la rama Equipo este mes, pagas S/ 18. Si no la usaste, pagas S/ 0." El usuario tiene claridad total sobre su costo. El riesgo es que se pierde la granularidad del pago proporcional y el usuario que usa una rama una sola vez paga lo mismo que el que la usa todos los días.

La recomendación preliminar es empezar con la **Opción C** por su simplicidad de implementación y comunicación, e iterar hacia un modelo más granular una vez que haya datos reales de uso. En el MVP, la complejidad de billing no debería competir con la complejidad de producto.

### Fuentes de ingreso

**Ingreso principal: cobro por uso de ramas.** Cada rama activa genera un cobro por el período en que se utilizó. El rango de referencia a validar es entre S/ 29 y S/ 199 mensuales para un usuario que utiliza el producto a capacidad completa, posicionándolo igual o por debajo de Odoo (S/ 70-200/mes fijo) y competitivo con Alegra (S/ 15-80/mes fijo).

**Ingreso principal: IA avanzada como upsell natural.** Cuando el negocio crece y el usuario necesita predicciones, análisis estratégico o simulaciones, ya ha experimentado el valor de la IA básica y la transición al pago se percibe como una extensión lógica, no como un producto nuevo. Las APIs de LLM generan costo variable, pero solo se activan para usuarios que ya están pagando por ramas premium.

**Ingreso secundario: comisiones transaccionales.** Un porcentaje sobre los cobros procesados a través de las pasarelas integradas (Yape, Plin, Mercado Pago). Este ingreso crece automáticamente con el volumen de transacciones del usuario sin requerir decisión de compra adicional.

**Ingreso futuro: marketplace y datos sectoriales.** A mediano plazo, un marketplace de plantillas de negocio, reportes sectoriales y conectores con sistemas de terceros. A largo plazo, inteligencia sectorial basada en datos anonimizados y agregados de la base de PYMEs, de valor para consultoras, inversores e instituciones financieras.

### Unit economics estimados (a validar)

Estos números son hipótesis iniciales basadas en benchmarks de SaaS B2SMB en LATAM. Deben refinarse con datos reales a partir de los primeros 50 usuarios.

**CAC (costo de adquisición por cliente):** Vía canal contadores, el CAC estimado es de S/ 15-30 por usuario (costo de comisión o incentivo al contador por referido exitoso). Vía contenido orgánico en redes sociales, el CAC puede bajar a S/ 5-15 pero el volumen es menos predecible. Vía programa de referidos, el CAC es cercano a S/ 0-10 (crédito de uso para el referidor). El CAC blended estimado para Fase 1 es de S/ 20.

**ARPU (ingreso promedio por usuario activo de pago):** Asumiendo que el usuario promedio paga por 1.5 ramas activas a un precio promedio de S/ 20 por rama, el ARPU estimado es de S/ 30/mes. En Fase 2, con usuarios más maduros usando 2-3 ramas más IA avanzada, el ARPU objetivo es de S/ 70-100/mes.

**LTV (valor de vida del cliente):** Con un churn mensual estimado de 8% (alto para SaaS pero realista para el segmento de micro-empresas donde la mortalidad de negocios es alta), la vida promedio del cliente es de 12.5 meses. A un ARPU de S/ 30, el LTV estimado es de S/ 375. A un ARPU de S/ 70 (Fase 2), el LTV sube a S/ 875.

**Ratio LTV/CAC:** Con un CAC de S/ 20 y un LTV de S/ 375, el ratio es de 18.75x, lo que es excelente si se confirma. El benchmark saludable para SaaS es superior a 3x. Sin embargo, este ratio es optimista porque asume un CAC bajo (dependiente del canal contadores que aún no está validado) y un ARPU que podría ser menor si los usuarios usan pocas ramas.

**Payback period:** Con ARPU de S/ 30/mes y CAC de S/ 20, el costo de adquisición se recupera en menos de 1 mes. Esto es muy favorable e indica que el crecimiento puede financiarse orgánicamente sin necesidad de grandes rondas de inversión, siempre y cuando los supuestos de CAC y ARPU se confirmen.

**Escenario conservador para Año 1:** 100 usuarios de pago con ARPU de S/ 30/mes generan S/ 3,000/mes o S/ 36,000 anuales (aproximadamente USD 9,500). Este ingreso no cubre los costos operativos de un equipo de desarrollo, pero valida el modelo y justifica la inversión de capital semilla en Fase 2.

### Viabilidad económica del modelo

La estructura de costos está diseñada para que el modelo se autofinancie por nivel. La IA básica opera offline con modelos ligeros, con un costo operativo cercano a cero. El costo de IA avanzada (APIs de LLM) crece solo cuando el usuario ya está en un tier de pago que cubre ese costo. No existe subsidio cruzado negativo donde usuarios gratuitos consuman recursos financiados por usuarios de pago.

Los costos fijos principales son el equipo técnico (desarrolladores full-stack, QA, UX, DevOps), que representa aproximadamente el 60% del gasto total, la infraestructura cloud (servidores, CDN, bases de datos, CI/CD) y el equipo de soporte y customer success.

Los costos variables son el consumo de APIs de LLM (proporcional a usuarios premium), la adquisición de usuarios (marketing digital, contenido educativo, participación en ferias PYME) y el cumplimiento regulatorio (facturación electrónica SUNAT, certificaciones de seguridad).

---

## Estrategia de Llegada al Mercado

### Distribución y canales

El canal de distribución prioritario son los **contadores y asesores tributarios** que ya visitan regularmente a bodegas y comercios en Lima. Estos profesionales tienen una relación de confianza establecida con el segmento objetivo y son consultados frecuentemente sobre herramientas de gestión. Una recomendación de un contador tiene más peso para un bodeguero que cualquier campaña publicitaria. La meta es establecer una red de 5 a 10 contadores activos en Lima como aliados de distribución. Esta hipótesis es la más importante a validar antes del lanzamiento.

El segundo canal es la **creación de contenido en TikTok e Instagram** con tips prácticos de gestión para PYMEs. Este canal tiene bajo costo de adquisición, construye marca y autoridad en el segmento, y genera captación orgánica escalable.

El tercer canal es un **programa de referidos entre dueños de negocio del mismo barrio**. Las bodegas en Lima operan en clusters geográficos donde los dueños se conocen entre sí. Un referido de un vecino comerciante tiene alta credibilidad y costo de adquisición cercano a cero.

Para la evaluación del producto, los prospectos encuentran una landing page con una demo interactiva y testimonios organizados por tipo de negocio (bodega, peluquería, restaurante). El producto se entrega como app web responsive en la primera fase, con app móvil nativa a partir de la segunda fase.

La recompra y expansión dentro de cada cuenta se produce de forma orgánica a través de la IA proactiva in-app, que sugiere el siguiente módulo cuando el negocio está listo para activarlo. El sistema vende el upgrade de forma natural, sin intervención de un equipo de ventas.

### Relación con el usuario

La captación se diseña alrededor de un registro freemium sin necesidad de tarjeta de crédito, con un onboarding guiado que se personaliza según el tipo de negocio ("Soy bodega", "Soy restaurante", "Soy peluquería"). El objetivo es que el usuario complete el setup y registre su primera venta en menos de 10 minutos, sin necesidad de soporte humano.

La retención se construye sobre tres pilares: celebración de hitos reales del negocio (primera venta, cliente número 100, mejor mes), una comunidad de emprendedores organizada por sector donde pueden compartir experiencias, y soporte continuo a través del chat de IA contextual que conoce el estado específico del negocio del usuario.

La expansión de cuentas se produce cuando la IA detecta que el negocio está listo para el siguiente nivel y lo comunica de forma proactiva: "Tu negocio ya tiene 3 empleados y estás gestionando turnos por WhatsApp. Activar la rama Equipo te permitiría automatizar horarios y calcular planillas en minutos."

La recuperación de usuarios inactivos se gestiona mediante alertas cuando el usuario deja de ingresar al sistema, acompañadas de un resumen de lo que ocurrió en su negocio mientras no estuvo (ventas pendientes de registrar, alertas de inventario, sugerencias de la IA que se acumularon).

### Alianzas estratégicas

Para operar en Perú desde el primer día, existen tres alianzas imprescindibles:

- **OSE / SUNAT** como proveedor de facturación electrónica homologado. Sin esta integración el producto no puede cumplir con la obligación fiscal de emisión de comprobantes electrónicos.

- **Yape / Plin** como pasarelas de cobro integradas. Son los métodos de pago dominantes en bodegas limeñas. La integración directa permite que el flujo de venta sea completo dentro del sistema, sin saltar a otra aplicación.

- **Red de contadores aliados** como canal de distribución, según se describió anteriormente.

En fases posteriores se suman proveedores de LLM (OpenAI, Anthropic) para las capacidades de IA avanzada, e incubadoras y cámaras de comercio de PYMEs para facilitar la expansión a nuevas ciudades y países.

---

## Plan de Crecimiento por Fases

### Fase 0 — Pre-MVP (estado actual)

El objetivo de esta fase es validar antes de construir. Las cuatro decisiones pendientes más críticas antes de escribir código de producto son:

1. **Definir la métrica de uso para facturación.** Qué evento o indicador dispara el cobro en el modelo usage-based. Se recomienda evaluar las tres opciones descritas en la sección de pricing y validar la elegida con al menos 10 bodegas antes de implementar.

2. **Validar disposición a pagar.** Regresar a las bodegas ya contactadas, presentar el modelo de pricing por uso y confirmar que estarían dispuestas a pagar. Hoy usan Excel, que es gratuito; el salto a una herramienta paga requiere una propuesta de valor que el usuario pueda cuantificar ("me ahorra X horas por semana" o "evito la multa de SUNAT").

3. **Confirmar el canal de contadores.** Cerrar al menos 2 o 3 contadores aliados de forma informal para tener el canal de distribución principal listo antes del lanzamiento. Sin este canal, el costo de adquisición de usuarios se multiplica significativamente.

4. **Definir el MVP mínimo.** Determinar exactamente qué es lo mínimo que necesita una bodega para registrar su primera venta electrónica en menos de 10 minutos dentro del sistema.

**Criterio go/no-go para pasar a Fase 1:** Al menos 5 de 10 bodegas entrevistadas confirman que pagarían por el modelo de uso propuesto, y al menos 2 contadores confirman disposición a recomendar el producto. Si estas dos condiciones no se cumplen, hay que reformular la propuesta de valor o el canal antes de invertir en desarrollo.

### Fase 1 — Beachhead en Lima

El objetivo es alcanzar 100 usuarios activos en bodegas y comercios minoristas de Lima. La táctica se apoya en tres pilares: distribución a través de contadores aliados, onboarding autónomo en menos de 10 minutos, y modelo freemium sin tarjeta de crédito donde el usuario experimenta el valor antes de pagar.

**Indicadores de validación:**
- Tiempo de onboarding inferior a 10 minutos
- Primera venta registrada dentro de las 24 horas posteriores al registro
- Retención superior al 40% en la cuarta semana
- Al menos un pago por uso ocurre antes del día 30
- Conversión de freemium a pago superior al 8% en los primeros 90 días

**Criterio go/no-go para pasar a Fase 2:** Al menos 30 de los 100 usuarios realizan al menos un pago en los primeros 3 meses, y la retención en semana 8 es superior al 25%. Si no se cumplen, se debe analizar si el problema es el producto (no resuelve el dolor), el precio (demasiado alto o modelo confuso), o el segmento (las bodegas no son el beachhead correcto).

### Fase 2 — Expansión sectorial y geográfica

Con el beachhead validado, se activan los canales de contenido en TikTok e Instagram, se desarrolla la app móvil nativa, se incorpora un growth marketer especializado en LATAM y se expande a nuevos sectores (restaurantes, peluquerías, servicios profesionales) y ciudades secundarias en Perú.

### Fase 3 — LATAM

Expansión a Colombia, México y Chile como mercados prioritarios por su alta densidad de PYMEs y regulación de facturación electrónica similar (DIAN en Colombia, SAT en México, SII en Chile). Requiere adaptar el módulo de facturación electrónica por país y establecer partnerships con incubadoras y cámaras de comercio regionales.

---

## Visión a Largo Plazo

En cinco años, ERP Evolutivo aspira a ser la plataforma de gestión empresarial dominante para micro y pequeñas empresas en Latinoamérica, con presencia en al menos cuatro países y una base de datos anónima de patrones de crecimiento de PYMEs que sea la más grande de la región.

El activo más valioso de la empresa a largo plazo no es el software sino la inteligencia acumulada: saber cómo crecen los negocios pequeños en LATAM, qué decisiones toman en cada etapa, qué funciona y qué no por sector y por ciudad. Esa inteligencia alimenta la IA (haciéndola cada vez más precisa), alimenta productos derivados (reportes sectoriales, inteligencia para inversores, scoring crediticio para instituciones financieras) y constituye una barrera de entrada que un competidor no puede replicar sin años de datos acumulados.

El endgame financiero más probable es una adquisición por parte de una fintech, un banco o una empresa de software empresarial que quiera acceso a la base de PYMEs más activa de LATAM y a la inteligencia de datos asociada. Alternativamente, el negocio puede mantenerse independiente y rentable si alcanza escala suficiente, dado que el modelo de costos variables permite rentabilidad operativa sin necesidad de millones de usuarios.

---

## Supuestos Clave del Modelo

Todo modelo de negocio se construye sobre supuestos. Hacerlos explícitos permite saber qué validar primero y dónde está el riesgo real si un supuesto resulta falso.

**Supuestos validados (con evidencia parcial):**
- Las bodegas en Lima usan Excel o libreta para gestionar su negocio (confirmado en entrevistas).
- Existe dolor real en el descontrol de ventas y facturación (confirmado en entrevistas).

**Supuestos no validados (riesgo alto si son falsos):**
- Los bodegueros están dispuestos a pagar por un sistema digital, habiendo usado Excel gratis toda su vida.
- Los contadores pueden y quieren funcionar como canal de distribución para un producto tecnológico.
- El modelo de pago por uso es comprensible y aceptable para un usuario con baja alfabetización digital.
- El onboarding se puede completar en menos de 10 minutos sin soporte humano para un usuario que nunca usó un sistema de gestión.
- La IA básica offline genera suficiente valor percibido como para diferenciar el producto del primer día (antes de tener datos para fine-tuning).

**Supuestos no validados (riesgo medio si son falsos):**
- La mecánica de gamificación realmente reduce la barrera de adopción en este perfil demográfico.
- El efecto flywheel de datos se activa con cientos de usuarios (no con miles o decenas de miles).
- Las comisiones transaccionales vía Yape/Plin son técnicamente integrables y económicamente viables como fuente de ingreso secundaria.
- El churn mensual del segmento puede mantenerse por debajo del 10% con las estrategias de retención descritas.

---

## Riesgos y Mitigaciones

### Riesgos de nivel alto (fase actual)

**Fundador único con perfil exclusivamente técnico.** Guillermo puede ejecutar el producto solo, pero la validación de mercado, la negociación con contadores aliados y la estrategia comercial son capacidades que necesita desarrollar o cubrir con un co-fundador o asesor de perfil comercial orientado a PYMEs.

**Canal de distribución no validado.** La estrategia de llegada al mercado depende fuertemente de que los contadores quieran y puedan recomendar el producto. Si esta hipótesis falla, el costo de adquisición de cada usuario crece de forma insostenible para un proyecto pre-revenue. Plan B: pivotar a un modelo 100% digital (redes sociales + referidos) aceptando un CAC más alto y crecimiento más lento.

**Disposición a pagar no confirmada.** Las bodegas usan Excel hoy, una herramienta gratuita que ya conocen. Pasar a una herramienta que cobra por uso, aunque sea poco, requiere que el dolor (facturación SUNAT, descontrol de ventas) sea lo suficientemente agudo como para justificar el cambio. Plan B: si el precio es la barrera, evaluar un modelo 100% gratuito monetizado solo por comisiones transaccionales (viable si el volumen de transacciones es alto).

### Riesgos de nivel medio

**Adopción lenta del segmento beachhead.** Mitigado parcialmente por el onboarding de menos de 10 minutos, el modelo freemium y la IA básica gratuita que entrega valor inmediato.

**Dependencia de APIs de LLM externas.** En la primera fase el consumo es controlable y el costo bajo. El riesgo crece en fases posteriores, pero para entonces los usuarios premium ya estarán financiando ese costo.

**Competidor local replica el modelo.** La barrera de entrada real es el flywheel de datos: cuantos más usuarios, mejores los modelos de IA, mejor la retención. Un competidor que llegue después tendría que replicar años de datos acumulados.

**Churn por complejidad percibida.** El público objetivo tiene baja alfabetización digital. La gamificación y el UX especializado son los antídotos principales, pero requieren inversión continua en diseño y testing con usuarios reales.

### Riesgos de nivel bajo

**Cambios regulatorios en facturación electrónica SUNAT.** Mitigado al usar un OSE homologado como socio en lugar de desarrollar la integración internamente. Además, cualquier endurecimiento de la regulación es un tailwind para el producto (más negocios obligados a digitalizarse).

---

## Contexto Técnico del Repositorio

### Stack y arquitectura

El repositorio actual es una aplicación Angular que usa standalone components, signals y Tailwind CSS con dark theme. No es el producto real: es una visualización interactiva del modelo de negocio para presentar a stakeholders e inversores.

El deployment es automático a GitHub Pages vía `.github/workflows/deploy.yml` en cada push a `main`. No requiere build step adicional.

### Estructura de la aplicación

La aplicación tiene cinco vistas principales, cada una como un componente standalone de Angular:

- **Modelo de Negocio** (`app-canvas`) — Visualización del modelo de negocio en nueve bloques estratégicos.
- **Arbol Evolutivo** (`app-tree`) — Las nueve ramas del producto y sus niveles de madurez.
- **IA Asesora** (`app-ai`) — Presentación de las capacidades de la IA y sus cuatro niveles.
- **Triggers** (`app-triggers`) — Las reglas de activación automática de módulos.
- **Pricing** (`app-pricing`) — Los planes de precio y ejemplos de costo por uso.

### Las nueve ramas evolutivas del producto

Equipo, Ventas, Locaciones, Inventario, Finanzas, Clientes, Digital, Analitica, Produccion. Cada rama tiene un color accent propio en la interfaz.

### Convenciones de diseno

- Dark theme con paleta consistente: purples, teals, greens, oranges.
- Responsive con breakpoints en 1000px (tablet) y 600px (mobile).
- Precios expresados en Soles peruanos (S/).
- Los niveles de IA siguen la misma progresion que las ramas: Basica, Estrategica, Predictiva, Ejecutiva.
- Badges de fase (FASE 1 / FASE 2+) para diferenciar el MVP del roadmap futuro.