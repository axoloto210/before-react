class LikeButtonViewModel {
    constructor() {
      this.likedCount = ko.observable(0);
      this.isPending = ko.observable(false);
      this.isFailed = ko.observable(false);
  
      this.buttonText = ko.computed(() => {
        if (this.isFailed()) return "failed";
        return `👍+${this.likedCount()}`;
      });

      this.isDisabled = ko.computed(() => {
        return this.isPending() || this.isFailed();
      });
  
      this.fetchInitialCount();
    }
  
    async fetchInitialCount() {
      try {
        const response = await fetch("http://localhost:4000/api/like");
        const data = await response.json();
        this.likedCount(data.likedCount);
      } catch (error) {
        console.error("Failed to fetch initial count:", error);
        this.isFailed(true);
      }
    }
  
    async incrementLike() {
      if (this.isPending()) return;
  
      this.isPending(true);
      try {
        const response = await fetch("http://localhost:4000/api/like", {
          method: "POST",
        });
        const data = await response.json();
        this.likedCount(data.likedCount);
        this.isFailed(false);
      } catch (error) {
        console.error("Failed to increment like:", error);
        this.isFailed(true);
      } finally {
        this.isPending(false);
      }
    }
}

ko.applyBindings(new LikeButtonViewModel());