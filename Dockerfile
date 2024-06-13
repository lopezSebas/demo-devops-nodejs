FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm prune --production

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000
RUN addgroup --system myappgroup && adduser --system --ingroup myappgroup myappuser
USER myappuser
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT}/api/users || exit 1

CMD ["node", "index.js"]
