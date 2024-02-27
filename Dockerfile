# Usa uma imagem base com Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN yarn install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Expõe a porta 8080 do container
EXPOSE 8080

# Comando para iniciar a aplicação Vue
CMD ["npm", "run", "serve"]
