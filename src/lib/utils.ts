type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: unknown };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const process = (value: ClassValue): void => {
    if (!value) return;
    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(process);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([key, v]) => {
        if (v) classes.push(key);
      });
    }
  };

  inputs.forEach(process);
  return classes.join(' ');
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
