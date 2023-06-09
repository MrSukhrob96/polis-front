class StorageService {
  public hasAccessToken(): boolean {
    return false;
  }

  public getLocalStorage(key: string): string {
    return "";
  }

  public getAccessToken() {}

  public getRefreshToken() {}

  public setAccessToken(key: string, value: string) {}

  public setRefreshToken(key: string, value: string) {}

  setCookie(
    name: string,
    value: string,
    days: number = 2,
    path: string = "/"
  ): void {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    const domain = window.location.host.split(".").splice(-2).join(".");

    const dir = path;
    document.cookie = `${name}=${
      value + expires
    }; domain=.${domain}; path=${dir}`;
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ")
        cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  }

  deleteCookie = (name: string): void => {
    this.setCookie(name, "", -1);
  };
}

export default new StorageService();
