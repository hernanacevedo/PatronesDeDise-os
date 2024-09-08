/*
1. Sistemas de Notificaciones
Contexto: Un sistema de notificaciones en una aplicación web o móvil.
Uso del Observer: Cuando un evento ocurre (por ejemplo, un nuevo mensaje, una actualización de estado, o una alerta), un sujeto puede notificar a varios observadores que podrían representar diferentes servicios (como enviar un correo electrónico, una notificación push o una actualización en tiempo real en la interfaz de usuario). Los observadores se suscriben al sujeto y responden al evento de manera independiente.
*/
interface IObserver<T> {
    refresh(value: T): void;
  }
  
  interface ISubject<T> {
    observers: IObserver<T>[];
    subscribe(observer: IObserver<T>): void;
    unsubscribe(observer: IObserver<T>): void;
    notify(value: T): void;
  }
  
  class NotificationService implements ISubject<string> {
    observers: IObserver<string>[] = [];
  
    subscribe(observer: IObserver<string>): void {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: IObserver<string>): void {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(message: string): void {
      this.observers.forEach(observer => observer.refresh(message));
    }
  }
  
  class EmailNotifier implements IObserver<string> {
    refresh(message: string): void {
      console.log(`Sending email notification: ${message}`);
    }
  }
  
  class PushNotifier implements IObserver<string> {
    refresh(message: string): void {
      console.log(`Sending push notification: ${message}`);
    }
  }
  
  // Uso
  const notificationService = new NotificationService();
  const emailNotifier = new EmailNotifier();
  const pushNotifier = new PushNotifier();
  
  notificationService.subscribe(emailNotifier);
  notificationService.subscribe(pushNotifier);
  
  notificationService.notify("You have a new message!");
  
  // Output:
  // Sending email notification: You have a new message!
  // Sending push notification: You have a new message!


  /*
  2. Actualización de Caché Distribuido
Contexto: En una aplicación distribuida con múltiples servidores y un caché distribuido.
Uso del Observer: Cuando el dato en la base de datos se actualiza, los servidores que mantienen una copia del caché podrían necesitar invalidar o actualizar sus datos. El servidor central (sujeto) notifica a todos los servidores dependientes (observadores) cuando se realiza un cambio relevante, asegurando que cada servidor tenga la versión más actualizada del dato.
*/

class CacheService implements IObserver<string> {
    refresh(key: string): void {
      console.log(`Invalidating cache for key: ${key}`);
    }
  }
  
  class DatabaseService implements ISubject<string> {
    observers: IObserver<string>[] = [];
  
    subscribe(observer: IObserver<string>): void {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: IObserver<string>): void {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(key: string): void {
      this.observers.forEach(observer => observer.refresh(key));
    }
  
    updateRecord(key: string, value: any): void {
      console.log(`Updating database record: ${key}`);
      this.notify(key);
    }
  }
  
  // Uso
  const databaseService = new DatabaseService();
  const cacheService = new CacheService();
  
  databaseService.subscribe(cacheService);
  databaseService.updateRecord("user:1234", { name: "John Doe" });
  
  // Output:
  // Updating database record: user:1234
  // Invalidating cache for key: user:1234
  

  /*
  3. Monitoreo de Salud del Sistema
Contexto: Una infraestructura de microservicios donde es crítico monitorear la salud de los servicios en tiempo real.
Uso del Observer: Un servicio centralizado de monitoreo (el sujeto) podría observar las métricas de varios microservicios. Si alguna métrica importante cambia (por ejemplo, el uso de la CPU, la latencia, etc.), el servicio de monitoreo notifica a los observadores correspondientes (servicios de alerta, dashboards de monitoreo, etc.) para tomar acciones inmediatas.
*/

class HealthService implements IObserver<string> {
    refresh(serviceName: string): void {
      console.log(`Health check failed for service: ${serviceName}`);
    }
  }
  
  class MonitoringService implements ISubject<string> {
    observers: IObserver<string>[] = [];
  
    subscribe(observer: IObserver<string>): void {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: IObserver<string>): void {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(serviceName: string): void {
      this.observers.forEach(observer => observer.refresh(serviceName));
    }
  
    checkHealth(serviceName: string, isHealthy: boolean): void {
      if (!isHealthy) {
        this.notify(serviceName);
      }
    }
  }
  
  // Uso
  const monitoringService = new MonitoringService();
  const healthService = new HealthService();
  
  monitoringService.subscribe(healthService);
  monitoringService.checkHealth("AuthService", false);
  
  // Output:
  // Health check failed for service: AuthService

  