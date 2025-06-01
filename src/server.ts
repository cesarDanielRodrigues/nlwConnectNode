import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountRoute } from './routes/get-subscriber-invite-count-route'
import { getSubscriberInviteRankingRoute } from './routes/get-subscriber-invite-ranking-route'
import { getRanking } from './functions/get-ranking'
import { getRankingRoute } from './routes/get-ranking-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Registrando rota para evento
app.register(subscribeToEventRoute)

// Registrando rota para acesso de usuário convidado
app.register(accessInviteLinkRoute)

// Registrando rota para contador de clicks no link
app.register(getSubscriberInviteClicksRoute)

// Registrando rota para contador de acessos pelo link/ranking
app.register(getSubscriberInviteCountRoute)

// Registrando rota para a posição no ranking
app.register(getSubscriberInviteRankingRoute)
app.register(getRankingRoute)


app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
