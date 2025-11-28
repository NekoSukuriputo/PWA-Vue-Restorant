# Dockerfile di root repo ts-portofolio-rpg test 
# --- STAGE 1: Build ---
# Menggunakan image Node.js versi Long Term Support (LTS) sebagai dasar untuk build
FROM node:22-alpine AS builder

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json terlebih dahulu untuk caching
COPY package*.json ./

# Menginstall semua dependencies
RUN npm ci

# Menyalin sisa source code aplikasi
COPY . .

# Menjalankan script build untuk menghasilkan file statis
RUN npm run build

# --- STAGE 2: Production ---
# Menggunakan image Nginx yang sangat ringan sebagai dasar image final
FROM nginx:1.25-alpine

# Menyalin file statis hasil build dari stage 'builder' ke direktori web root Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Memberitahu Docker bahwa container akan berjalan di port 80
EXPOSE 80

# Perintah untuk menjalankan Nginx saat container dimulai
CMD ["nginx", "-g", "daemon off;"]
