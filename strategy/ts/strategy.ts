interface Strategy{
    login(user:string,password:string):boolean;
}
class LoginContext{
    private strategy: Strategy
    constructor(strategy:Strategy){
        this.strategy=strategy
    }
    setStrategy(strategy:Strategy){
        this.strategy=strategy
    }

    login(user:string,password:string):boolean{
        return this.strategy.login(user,password);
    };


}

class LoginDBStrategy implements Strategy{
    login(user:string,password:string):boolean{
        console.log("nos dirijimos a la base de datos")
        if(user=== "admin" && password==="entra"){
            return true;
        }
        return false
    }
}

class LoginServiceStrategy implements Strategy{
    login(user:string,password:string):boolean{
        console.log("nos dirijimos a un servicio de autenticacion")
        if(user=== "admin" && password==="entra"){
            return true;
        }
        return false
    }
}

class LoginGoogleStrategy implements Strategy{
    login(user:string,password:string):boolean{
        console.log("nos dirijimos a google")
        if(user=== "admin" && password==="entra"){
            return true;
        }
        return false
    }
}

const auth1 = new LoginContext( new LoginDBStrategy())
auth1.login("admin", "entra")
auth1.setStrategy(new LoginServiceStrategy());
auth1.login("admin", "entra")
auth1.setStrategy(new LoginGoogleStrategy());
auth1.login("admin", "entra")



// Ejemplos de posibles usos del patron

/*
1. Procesamiento de Pagos
Imagina que estás desarrollando un sistema de comercio electrónico. Puedes usar el patrón Strategy para manejar diferentes métodos de pago, como tarjetas de crédito, PayPal, o criptomonedas.
*/
interface PaymentStrategy {
    processPayment(amount: number): boolean;
}

class CreditCardPayment implements PaymentStrategy {
    processPayment(amount: number): boolean {
        console.log(`Processing credit card payment of $${amount}`);
        return true;
    }
}

class PayPalPayment implements PaymentStrategy {
    processPayment(amount: number): boolean {
        console.log(`Processing PayPal payment of $${amount}`);
        return true;
    }
}

class CryptoPayment implements PaymentStrategy {
    processPayment(amount: number): boolean {
        console.log(`Processing crypto payment of $${amount}`);
        return true;
    }
}

class PaymentContext {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    process(amount: number): boolean {
        return this.strategy.processPayment(amount);
    }
}

// Uso
const payment = new PaymentContext(new CreditCardPayment());
payment.process(100);
payment.setStrategy(new PayPalPayment());
payment.process(200);
payment.setStrategy(new CryptoPayment());
payment.process(300);


/*
2. Cálculo de Impuestos
Si trabajas en un sistema que debe calcular impuestos para diferentes regiones, el patrón Strategy puede ayudarte a implementar las diferentes reglas de impuestos.
*/
interface TaxStrategy {
    calculate(amount: number): number;
}

class USATax implements TaxStrategy {
    calculate(amount: number): number {
        return amount * 0.07;
    }
}

class EuropeTax implements TaxStrategy {
    calculate(amount: number): number {
        return amount * 0.20;
    }
}

class AsiaTax implements TaxStrategy {
    calculate(amount: number): number {
        return amount * 0.10;
    }
}

class TaxContext {
    private strategy: TaxStrategy;

    constructor(strategy: TaxStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: TaxStrategy) {
        this.strategy = strategy;
    }

    calculateTax(amount: number): number {
        return this.strategy.calculate(amount);
    }
}

// Uso
const tax = new TaxContext(new USATax());
console.log(tax.calculateTax(100)); // USA tax
tax.setStrategy(new EuropeTax());
console.log(tax.calculateTax(100)); // Europe tax
tax.setStrategy(new AsiaTax());
console.log(tax.calculateTax(100)); // Asia tax

/*
3. Cifrado y Desencriptado de Datos
En un sistema donde se requiera manejar cifrado y desencriptado de datos de manera flexible, podrías usar el patrón Strategy para alternar entre diferentes algoritmos de cifrado.
*/
interface EncryptionStrategy {
    encrypt(data: string): string;
    decrypt(data: string): string;
}

class AESEncryption implements EncryptionStrategy {
    encrypt(data: string): string {
        return `AES(${data})`;
    }

    decrypt(data: string): string {
        return data.replace("AES(", "").replace(")", "");
    }
}

class DESEncryption implements EncryptionStrategy {
    encrypt(data: string): string {
        return `DES(${data})`;
    }

    decrypt(data: string): string {
        return data.replace("DES(", "").replace(")", "");
    }
}

class EncryptionContext {
    private strategy: EncryptionStrategy;

    constructor(strategy: EncryptionStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: EncryptionStrategy) {
        this.strategy = strategy;
    }

    encrypt(data: string): string {
        return this.strategy.encrypt(data);
    }

    decrypt(data: string): string {
        return this.strategy.decrypt(data);
    }
}

// Uso
const encryption = new EncryptionContext(new AESEncryption());
const encrypted = encryption.encrypt("myData");
console.log(encrypted); // AES(myData)
console.log(encryption.decrypt(encrypted)); // myData

encryption.setStrategy(new DESEncryption());
const encryptedDES = encryption.encrypt("myData");
console.log(encryptedDES); // DES(myData)
console.log(encryption.decrypt(encryptedDES)); // myData

/*
4. Serialización y Deserialización de Objetos
En un entorno donde se necesita soportar múltiples formatos de datos (JSON, XML, YAML), el patrón Strategy puede manejar diferentes estrategias de serialización.
*/
interface SerializationStrategy {
    serialize(data: any): string;
    deserialize(data: string): any;
}

class JSONSerialization implements SerializationStrategy {
    serialize(data: any): string {
        return JSON.stringify(data);
    }

    deserialize(data: string): any {
        return JSON.parse(data);
    }
}

class XMLSerialization implements SerializationStrategy {
    serialize(data: any): string {
        // Pseudocódigo para XML
        return `<xml>${data}</xml>`;
    }

    deserialize(data: string): any {
        // Pseudocódigo para XML
        return data.replace("<xml>", "").replace("</xml>", "");
    }
}

class SerializationContext {
    private strategy: SerializationStrategy;

    constructor(strategy: SerializationStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SerializationStrategy) {
        this.strategy = strategy;
    }

    serialize(data: any): string {
        return this.strategy.serialize(data);
    }

    deserialize(data: string): any {
        return this.strategy.deserialize(data);
    }
}

// Uso
const serializer = new SerializationContext(new JSONSerialization());
const jsonData = serializer.serialize({ name: "John", age: 30 });
console.log(jsonData); // JSON string
console.log(serializer.deserialize(jsonData)); // Object

serializer.setStrategy(new XMLSerialization());
const xmlData = serializer.serialize("John");
console.log(xmlData); // XML string
console.log(serializer.deserialize(xmlData)); // String

/*
5. Algoritmos de Compresión
Si tu aplicación necesita comprimir y descomprimir datos en diferentes formatos, el patrón Strategy te permite cambiar entre diferentes algoritmos de compresión de manera flexible.
*/
interface CompressionStrategy {
    compress(data: string): string;
    decompress(data: string): string;
}

class ZipCompression implements CompressionStrategy {
    compress(data: string): string {
        return `ZIP(${data})`;
    }

    decompress(data: string): string {
        return data.replace("ZIP(", "").replace(")", "");
    }
}

class GzipCompression implements CompressionStrategy {
    compress(data: string): string {
        return `GZIP(${data})`;
    }

    decompress(data: string): string {
        return data.replace("GZIP(", "").replace(")", "");
    }
}

class CompressionContext {
    private strategy: CompressionStrategy;

    constructor(strategy: CompressionStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: CompressionStrategy) {
        this.strategy = strategy;
    }

    compress(data: string): string {
        return this.strategy.compress(data);
    }

    decompress(data: string): string {
        return this.strategy.decompress(data);
    }
}

// Uso
const compressor = new CompressionContext(new ZipCompression());
const compressed = compressor.compress("myData");
console.log(compressed); // ZIP(myData)
console.log(compressor.decompress(compressed)); // myData

compressor.setStrategy(new GzipCompression());
const compressedGzip = compressor.compress("myData");
console.log(compressedGzip); // GZIP(myData)
console.log(compressor.decompress(compressedGzip)); // myData

/*
6. Gestión de Cache
En una aplicación donde diferentes tipos de almacenamiento en caché podrían ser utilizados (por ejemplo, en memoria, en disco, o en una base de datos distribuida como Redis), el patrón Strategy puede ayudar a cambiar entre ellos sin modificar la lógica de la aplicación.
*/
interface CacheStrategy {
    get(key: string): string | null;
    set(key: string, value: string): void;
}

class MemoryCache implements CacheStrategy {
    private cache: Map<string, string> = new Map();

    get(key: string): string | null {
        return this.cache.get(key) || null;
    }

    set(key: string, value: string): void {
        this.cache.set(key, value);
    }
}

class DiskCache implements CacheStrategy {
    // Pseudocódigo para un cache basado en disco
    get(key: string): string | null {
        console.log(`Fetching ${key} from disk cache`);
        return "diskValue"; // Pseudocódigo
    }

    set(key: string, value: string): void {
        console.log(`Saving ${key} to disk cache`);
    }
}

class RedisCache implements CacheStrategy {
    // Pseudocódigo para un cache basado en Redis
    get(key: string): string | null {
        console.log(`Fetching ${key} from Redis`);
        return "redisValue"; // Pseudocódigo
    }

    set(key: string, value: string): void {
        console.log(`Saving ${key} to Redis`);
    }
}

class CacheContext {
    private strategy: CacheStrategy;

    constructor(strategy: CacheStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: CacheStrategy) {
        this.strategy = strategy;
    }

    get(key: string): string | null {
        return this.strategy.get(key);
    }

    set(key: string, value: string): void {
        this.strategy.set(key, value);
    }
}

// Uso
const cache = new CacheContext(new MemoryCache());
cache.set("user1", "John Doe");
console.log(cache.get("user1")); // Memory cache

cache.setStrategy(new DiskCache());
console.log(cache.get("user1")); // Disk cache

cache.setStrategy(new RedisCache());
console.log(cache.get("user1")); // Redis cache

/*
7. Notificación de Usuarios
En un sistema que envía notificaciones a los usuarios, podrías usar diferentes estrategias según el canal de comunicación: correo electrónico, SMS, o notificaciones push.
*/
interface NotificationStrategy {
    sendNotification(message: string, user: string): void;
}

class EmailNotification implements NotificationStrategy {
    sendNotification(message: string, user: string): void {
        console.log(`Sending email to ${user}: ${message}`);
    }
}

class SMSNotification implements NotificationStrategy {
    sendNotification(message: string, user: string): void {
        console.log(`Sending SMS to ${user}: ${message}`);
    }
}

class PushNotification implements NotificationStrategy {
    sendNotification(message: string, user: string): void {
        console.log(`Sending push notification to ${user}: ${message}`);
    }
}

class NotificationContext {
    private strategy: NotificationStrategy;

    constructor(strategy: NotificationStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: NotificationStrategy) {
        this.strategy = strategy;
    }

    send(message: string, user: string): void {
        this.strategy.sendNotification(message, user);
    }
}

// Uso
const notifier = new NotificationContext(new EmailNotification());
notifier.send("Welcome!", "john.doe@example.com");

notifier.setStrategy(new SMSNotification());
notifier.send("Your OTP is 123456", "555-1234");

notifier.setStrategy(new PushNotification());
notifier.send("You have a new message", "john_doe");

/*
8. Manejo de Errores
Podrías usar el patrón Strategy para implementar diferentes estrategias de manejo de errores, como reintentos automáticos, registro en logs, o notificaciones.
*/

interface ErrorHandlingStrategy {
    handleError(error: Error): void;
}

class RetryStrategy implements ErrorHandlingStrategy {
    handleError(error: Error): void {
        console.log(`Retrying after error: ${error.message}`);
    }
}

class LogStrategy implements ErrorHandlingStrategy {
    handleError(error: Error): void {
        console.log(`Logging error: ${error.message}`);
    }
}

class NotifyAdminStrategy implements ErrorHandlingStrategy {
    handleError(error: Error): void {
        console.log(`Notifying admin about error: ${error.message}`);
    }
}

class ErrorHandlingContext {
    private strategy: ErrorHandlingStrategy;

    constructor(strategy: ErrorHandlingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ErrorHandlingStrategy) {
        this.strategy = strategy;
    }

    handleError(error: Error): void {
        this.strategy.handleError(error);
    }
}

// Uso
const errorHandler = new ErrorHandlingContext(new RetryStrategy());
errorHandler.handleError(new Error("Network issue"));

errorHandler.setStrategy(new LogStrategy());
errorHandler.handleError(new Error("Database connection failed"));

errorHandler.setStrategy(new NotifyAdminStrategy());
errorHandler.handleError(new Error("Critical system failure"));

/*
9. Generación de Reportes
En una aplicación que genera reportes en diferentes formatos (PDF, Excel, HTML), el patrón Strategy te permite cambiar entre las diferentes formas de generar estos reportes sin modificar la lógica principal.
*/
interface ReportStrategy {
    generateReport(data: any): string;
}

class PDFReport implements ReportStrategy {
    generateReport(data: any): string {
        return `PDF report for data: ${JSON.stringify(data)}`;
    }
}

class ExcelReport implements ReportStrategy {
    generateReport(data: any): string {
        return `Excel report for data: ${JSON.stringify(data)}`;
    }
}

class HTMLReport implements ReportStrategy {
    generateReport(data: any): string {
        return `<html><body>${JSON.stringify(data)}</body></html>`;
    }
}

class ReportContext {
    private strategy: ReportStrategy;

    constructor(strategy: ReportStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ReportStrategy) {
        this.strategy = strategy;
    }

    generate(data: any): string {
        return this.strategy.generateReport(data);
    }
}

// Uso
const reportContext = new ReportContext(new PDFReport());
console.log(reportContext.generate({ name: "John", age: 30 }));

reportContext.setStrategy(new ExcelReport());
console.log(reportContext.generate({ name: "Jane", age: 25 }));

reportContext.setStrategy(new HTMLReport());
console.log(reportContext.generate({ name: "Doe", age: 40 }));
