console.log("Hola mundo");

class SingletonTS {
  private static instance: SingletonTS;
  public random: number;

  private constructor() {
    this.random = Math.random();
  }
  public static getInstance(): SingletonTS {
    if (!this.instance) {
      this.instance = new SingletonTS();
    }
    return this.instance;
  }
}
const singleton1 = SingletonTS.getInstance();
const singleton4 = SingletonTS.getInstance();
console.log(singleton1.random);
console.log(singleton4.random);

// --
// ejemplo 2
//---

//Problema: Imagina una aplicación que necesita acceder a
//configuraciones globales (como la configuración de la base de datos,
// opciones de cacheo, rutas de API, etc.) desde múltiples partes de la aplicación.

/*
 Solución con Singleton: Se puede utilizar un Singleton para asegurarse de que todas las partes de la aplicación accedan y
  modifiquen la misma instancia de la configuración, evitando inconsistencias.
*/
class ConfigManager {
  private static instance: ConfigManager;
  public config: { [key: string]: any } = {};

  private constructor() {
    // Inicialización con configuraciones por defecto
    this.config = {
      databaseURL: "http://localhost:5432",
      cacheDuration: 3600,
    };
  }

  public static getInstance(): ConfigManager {
    if (!this.instance) {
      this.instance = new ConfigManager();
    }
    return this.instance;
  }

  public setConfig(key: string, value: any) {
    this.config[key] = value;
  }

  public getConfig(key: string): any {
    return this.config[key];
  }
}

// Uso
const config = ConfigManager.getInstance();
console.log(config.getConfig("databaseURL"));
config.setConfig("cacheDuration", 7200);

/*
2. Controlador de Conexiones de Base de Datos
Problema: En aplicaciones que interactúan con bases de datos, es importante mantener una única conexión abierta a la base de datos para evitar múltiples conexiones no gestionadas, lo que puede llevar a problemas de rendimiento.
Solución con Singleton: Un Singleton puede gestionar y reutilizar una sola conexión a la base de datos en toda la aplicación.
*/
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    this.connection = this.createConnection();
  }

  private createConnection() {
    // Lógica para crear una conexión a la base de datos
    console.log("Conexión a la base de datos creada.");
    return {}; // Retorna un objeto de conexión simulado
  }

  public static getInstance(): DatabaseConnection {
    if (!this.instance) {
      this.instance = new DatabaseConnection();
    }
    return this.instance;
  }

  public getConnection() {
    return this.connection;
  }
}

// Uso
const db1 = DatabaseConnection.getInstance().getConnection();
const db2 = DatabaseConnection.getInstance().getConnection();

/*
3. Registro de Log Global
Problema: En una aplicación, especialmente en aquellas que se ejecutan en servidores, es común tener un sistema de logging para registrar errores, advertencias, o cualquier información relevante. Es importante que todas las partes de la aplicación escriban en el mismo archivo o sistema de log.
Solución con Singleton: Se puede utilizar un Singleton para gestionar el acceso a un único registrador de log en toda la aplicación.
*/
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  public log(message: string) {
    const timestamp = new Date().toISOString();
    this.logs.push(`${timestamp}: ${message}`);
    console.log(`${timestamp}: ${message}`);
  }

  public getLogs() {
    return this.logs;
  }
}

// Uso
const logger = Logger.getInstance();
logger.log("Aplicación iniciada");
logger.log("Error al conectar a la base de datos");

/*
4. Gestor de Cache Global
Problema: En aplicaciones que requieren almacenar temporalmente datos para mejorar el rendimiento (caching), es esencial que el cache sea compartido a lo largo de toda la aplicación para evitar recalculaciones o solicitudes innecesarias.
Solución con Singleton: Un Singleton puede manejar el almacenamiento en cache para asegurarse de que todas las partes de la aplicación utilicen el mismo cache.
*/

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): CacheManager {
    if (!this.instance) {
      this.instance = new CacheManager();
    }
    return this.instance;
  }

  public set(key: string, value: any) {
    this.cache.set(key, value);
  }

  public get(key: string): any {
    return this.cache.get(key);
  }

  public clear() {
    this.cache.clear();
  }
}

// Uso
const cache = CacheManager.getInstance();
cache.set("user_123", { name: "John Doe", age: 30 });
console.log(cache.get("user_123"));

/*
5. Control de Acceso (Autenticación y Autorización)
Problema: En aplicaciones que requieren controlar el acceso de usuarios a ciertos recursos, se necesita un gestor de sesiones o autenticación centralizado para manejar el estado de autenticación del usuario en toda la aplicación.
Solución con Singleton: Un Singleton puede gestionar la autenticación del usuario, permitiendo que todas las partes de la aplicación verifiquen el estado de autenticación y obtengan los detalles del usuario actual.
*/

class AuthManager {
  private static instance: AuthManager;
  private user: { id: number; name: string } | null = null;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!this.instance) {
      this.instance = new AuthManager();
    }
    return this.instance;
  }

  public login(userId: number, userName: string) {
    this.user = { id: userId, name: userName };
  }

  public logout() {
    this.user = null;
  }

  public getUser() {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }
}

// Uso
const auth = AuthManager.getInstance();
auth.login(1, "Jane Doe");
console.log(auth.getUser()); // { id: 1, name: 'Jane Doe' }
console.log(auth.isAuthenticated()); // true
