import { AppEventBus } from '../AppEventBus'


export const mapableMixin = {
  created () {
   
    if (!this.$map) {
      AppEventBus.$on('ol-map-mounted', (olMap) => {
        this.map = olMap;

        if (this.onMapBound) {
          this.onMapBound();
          this.unbound = false;
        }
      });
    } else {
      this.map = this.$map;
      if (this.onMapBound) {
        this.onMapBound();
        this.unbound = false;
      }
    }
    AppEventBus.$on('ol-map-unmounted', () => {
      if (this.onMapUnbound) {
        this.onMapUnbound();
        this.unbound = true;
      }
    });
  }
};
