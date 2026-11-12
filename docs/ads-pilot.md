# Piloto de publicidad ENOS (300–500 €)

Checklist operativo para lanzar un piloto medible. No invertir 1.000 € de golpe hasta cerrar los P0.

## URL piloto recomendada

- Primaria: `/alquiler/gruas` o `/alquiler/vacuum-cisternas`
- Alternativa de categoría: `/alquiler`
- **No** usar solo `/` (home) para tráfico frío

UTM ejemplo:

```
https://TU-DOMINIO/alquiler/gruas?utm_source=meta&utm_medium=paid&utm_campaign=piloto_gruas_oriente&utm_content=creative_a
```

## P0 antes de gastar (obligatorio)

1. **Identidad pública** en Vercel / `.env` de producción:
   - `NEXT_PUBLIC_EMAIL`
   - `NEXT_PUBLIC_ADDRESS`
   - `NEXT_PUBLIC_RIF`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_PHONE_DISPLAY`
2. **Medición**
   - `NEXT_PUBLIC_GA_ID` (formato `G-…`)
   - `NEXT_PUBLIC_META_PIXEL_ID`
   - Quitar `NEXT_PUBLIC_META_TEST_EVENT_CODE` en Production al terminar pruebas
3. **CRM / correo**
   - `HUBSPOT_ACCESS_TOKEN` con scopes de contacts, deals y companies
   - o `RESEND_*` + `LEAD_TO_EMAIL` como respaldo
4. **Prueba end-to-end**
   - Aceptar cookies en el sitio
   - Enviar un lead de prueba en la landing piloto
   - Verificar: WhatsApp abre, HubSpot crea contacto/empresa/deal (o llega el correo), GA4 DebugView ve `generate_lead`, Meta Events Manager ve `Lead`
5. **SLA comercial**
   - Dueño del WhatsApp definido
   - Respuesta &lt; 30 min en horario comercial (texto público: `NEXT_PUBLIC_COMMERCIAL_SLA`)

### GA4 — marcar conversión

1. Admin → Eventos → `generate_lead` → Marcar como conversión
2. (Opcional) marcar también `whatsapp_click`
3. Google Ads: importar la conversión de GA4 si usas Search

### Meta — Events Manager

1. Pixel Helper / Test events con el formulario
2. Optimizar campaña a evento **Lead** (estándar `fbq('track','Lead')`)
3. No optimizar solo a Link Click / Landing Page View para este piloto B2B

## Presupuesto sugerido

| Concepto | Importe |
|----------|---------|
| Meta Ads (principal) | 250–400 € |
| Google Search (opcional) | 0–150 € |
| **Total piloto** | **300–500 €** |
| Ritmo | 20–40 €/día, 7–10 días |

Supuestos iniciales (hipótesis, no KPIs garantizados):

- CPL objetivo de aprendizaje: 8–20 €
- ≥ 20 leads para leer señal
- 1–2 ad sets, 3 creatividades, 1 landing

## Métricas go / hold / kill

| Señal | Acción |
|-------|--------|
| CPL estable, ≥40 % leads cualificados (empresa + zona + descripción usable), ≥1 cotización seria/semana | **Subir** presupuesto |
| CPL aceptable pero pocos cierres | **Mantener** y mejorar follow-up / oferta |
| Tracking roto, &lt;20 % cualificados, o cero respuestas comerciales | **Detener** y corregir |

Tras ~400 €: si CPL &gt; 25 € **y** &lt;30 % contactables/cualificados → pausar; no subir presupuesto.

## Calidad de lead (definición operativa)

Un lead cuenta como **cualificado** si:

1. Tiene empresa y teléfono válidos
2. Indica zona/sitio atendible
3. Describe necesidad usable (≥20 caracteres con contexto)
4. El comercial logra contactarlo en &lt;30 min (horario) o en la primera franja del día siguiente

Registrar en HubSpot etapas: Nuevo lead → Contactado → Cotización enviada → En negociación → Ganado/Perdido.

## Día a día (7 días)

1. Completar env legales + contacto
2. Activar GA4/Meta + test de conversión + cookies
3. Verificar HubSpot/Resend/WhatsApp + turnos SLA
4. Congelar creatividades alineadas a la landing piloto
5. Soft launch 20–30 €/día
6. Matar creatividades con CTR/CPL peor
7. Decidir scale / hold / kill con la tabla de arriba

## Mensaje creativo (alineado a landing)

- Problema: izaje / vacuum / parada sin equipo a tiempo
- Zona: oriente / industria energética
- CTA: cotizar por WhatsApp / formulario
- Sin precios inventados ni certificaciones no aportadas
