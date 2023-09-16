export const pagineted = (page: number, data: any, setStore: any) => {
    setStore;
    data = page
  };
  
export const Previous = (current: number, step: any, reset: any) => {
    if (current > 1) {
        step;
    } else {
        reset;
    }
}
  
export const Next = (current: number, step: any, reset: any, totals: number) => {
    if (current <= totals) {
        step;
    } else {
        reset;
    }
  }