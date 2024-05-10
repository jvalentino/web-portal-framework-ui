import Cookies from "universal-cookie";
import config from './config.yaml';

class AppState {
  private static instance: AppState | null = null;
  private cookies = new Cookies();

  private constructor() {
    if (AppState.instance) {
      throw new Error("You can only create one instance!");
    }
    AppState.instance = this;
  }

  public static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  public getConfig(): any {
    return config;
  }

  public getSessionId(): string | undefined {
    return this.cookies.get("web-portal-framework-session-id");
  }

  public setSessionId(sessionId: string): void {
    this.cookies.set("web-portal-framework-session-id", sessionId);
  }

  public getUrl(): string | undefined {
    return process.env.REACT_APP_HTTP_API;
  }

  public getBuilderApiKey(): string | undefined {
    return process.env.REACT_APP_BUILDER_API_KEY;
  }

  public setLanguage(language: string): void {
    this.cookies.set("web-portal-framework-language", language);
  }

  public getLanguage(): string | undefined {
    return this.cookies.get("web-portal-framework-language");
  }

  public setTextAlign(textAlign: string): void {
    this.cookies.set("web-portal-framework-text-align", textAlign);
  }

  public getTextAlign(): string | undefined {
    return this.cookies.get("web-portal-framework-text-align");
  }

  public setLoggedInName(name: string): void {
    this.cookies.set("web-portal-framework-logged-in-name", name);
  }

  public getLoggedInName(): string | undefined {
    return this.cookies.get("web-portal-framework-logged-in-name");
  }

  public setLoggedInPicture(url: string): void {
    this.cookies.set("web-portal-framework-logged-in-picture", url);
  }

  public getLoggedInPicture(): string | undefined {
    return this.cookies.get("web-portal-framework-logged-in-picture");
  }

  public markLoggedIn(sessionId: string | null, name: string, pictureUrl: string): void {
    if (sessionId != null) {
      this.setSessionId(sessionId);
      this.setLoggedInName(name);
      this.setLoggedInPicture(pictureUrl);
    } else {
      this.cookies.remove("web-portal-framework-logged-in-name");
      this.cookies.remove("web-portal-framework-logged-in-picture");
      this.cookies.remove("web-portal-framework-logged-session-id");
    }
  }

  public getTimeZone(): string {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return timeZone;
  }

  public isMobile(): boolean {
    return window.innerWidth <= 768;
  }

}

const singletonCounter = Object.freeze(AppState.getInstance());
export default singletonCounter;
