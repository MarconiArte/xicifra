#!/usr/bin/env node

/**
 * Script para crear nuevos proyectos Astro + Tailwind (últimas versiones compatibles)
 * Uso: node create_project.js nombre_del_proyecto
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function main() {
    const projectName = process.argv[2];
    
    if (!projectName) {
        console.log("❌ Uso: node create_project.js nombre_del_proyecto");
        process.exit(1);
    }
    
    const currentDir = process.cwd();
    const projectDir = path.join(currentDir, projectName);
    
    if (fs.existsSync(projectDir)) {
        console.log(`❌ Error: La carpeta '${projectName}' ya existe`);
        process.exit(1);
    }
    
    console.log(`📋 Creando proyecto Astro base en '${projectName}'...`);
    
    try {
        // 1. Crear proyecto Astro con plantilla mínima
        console.log("🚀 Instalando última versión de Astro...");
        // Usamos npm create astro@latest con flags para automatizarlo
        execSync(`npm create astro@latest ${projectName} -- --template minimal --install --no-git --yes`, { stdio: 'inherit' });
        
        // 2. Moverse al directorio del proyecto
        process.chdir(projectDir);
        
        // 3. Añadir Tailwind CSS
        console.log("\n🎨 Integrando última versión compatible de Tailwind CSS...");
        execSync('npx astro add tailwind --yes', { stdio: 'inherit' });
        
        console.log("\n" + "=".repeat(50));
        console.log(`🎉 Proyecto '${projectName}' creado exitosamente con Astro y Tailwind!`);
        console.log("=".repeat(50));
        console.log(`\n📂 Ubicación: ${projectDir}`);
        console.log(`\n🚀 Próximos pasos:`);
        console.log(`   cd ${projectName}`);
        console.log(`   npm run dev`);
        console.log("\n");
        
    } catch (e) {
        console.log(`\n❌ Ocurrió un error durante la creación: ${e.message}`);
        process.exit(1);
    }
}

main();
