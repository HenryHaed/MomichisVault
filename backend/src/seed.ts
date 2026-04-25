import 'dotenv/config';
import dataSource from './data-source';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcryptjs';
import { Carpeta, TipoCarpeta } from './entities/carpeta.entity';
import { IntegracionNube } from './entities/integracion-nube.entity';

async function runSeed() {
  try {
    // Inicializar conexión
    await dataSource.initialize();
    console.log('✅ Base de datos conectada.');

    const usuarioRepository = dataSource.getRepository(Usuario);
    const carpetaRepository = dataSource.getRepository(Carpeta);
    const integracionRepository = dataSource.getRepository(IntegracionNube);

    // 1. Limpiar base de datos para no tener conflictos de duplicados
    await dataSource.query('TRUNCATE usuarios, carpetas, integraciones_nube, archivos, tareas_procesamiento CASCADE');
    console.log('🧹 Base de datos limpiada (TRUNCATE).');

    // 2. Crear un usuario de prueba
    const adminPassword = 'MomichisVault123!';
    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
    const admin = usuarioRepository.create({
      correoElectronico: 'admin@carpetamagica.com',
      contrasenaHash: adminPasswordHash
    });
    await usuarioRepository.save(admin);
    console.log('✅ Usuario de prueba creado (admin@carpetamagica.com).');

    // 3. Crear carpetas base (Entrada y Salida)
    const carpetaEntrada = carpetaRepository.create({
      nombre: 'Entrada Mágica',
      tipoCarpeta: TipoCarpeta.ENTRADA_MAGICA,
      usuario: admin,
      idCarpetaNube: 'folder_input_mock_id_123'
    });
    
    const carpetaSalida = carpetaRepository.create({
      nombre: 'Salida Procesada',
      tipoCarpeta: TipoCarpeta.SALIDA_PROCESADA,
      usuario: admin,
      idCarpetaNube: 'folder_output_mock_id_456'
    });

    await carpetaRepository.save([carpetaEntrada, carpetaSalida]);
    console.log('✅ Carpetas iniciales creadas.');

    // 4. Crear configuración de nube (Simulada)
    const integracion = integracionRepository.create({
      usuario: admin,
      proveedor: 'dropbox',
      idCuentaNube: 'mock_dropbox_user_999',
      tokenAcceso: 'mock_access_token_abc123',
      cursorWebhook: ''
    });
    await integracionRepository.save(integracion);
    console.log('✅ Configuración de integración a nube creada.');

    console.log('🚀 Seed ejecutado exitosamente.');
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
  } finally {
    // Cerrar conexión
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

// Ejecutar script
runSeed();
