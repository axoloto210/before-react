// Like Button Model
const LikeModel = Backbone.Model.extend({
    defaults: {
      likedCount: 0,
      isPending: false,
      failed: false
    },
  
    url: 'http://localhost:4000/api/like',
  
    initialize: function() {
      this.fetch(); // 初期データの取得
    },
  
    incrementLike: async function() {
      if (this.get('isPending')) return;
  
      this.set('isPending', true);
      
      try {
        const response = await fetch(this.url, {
          method: 'POST'
        });
        const data = await response.json();
        
        this.set({
          likedCount: data.likedCount,
          isPending: false
        });
      } catch (error) {
        this.set({
          failed: true,
          isPending: false
        });
      }
    }
  });
  
  // Like Button View
  const LikeButtonView = Backbone.View.extend({
    el: '#like-button-container',
    
    template: _.template($('#like-button-template').html()),
    
    events: {
      'click #like-button': 'handleClick'
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    
    render: function() {
      const templateData = {
        likedCount: this.model.get('likedCount'),
        isPending: this.model.get('isPending'),
        failed: this.model.get('failed')
      };
      
      this.$el.html(this.template(templateData));
      return this;
    },
    
    handleClick: function() {
      this.model.incrementLike();
    }
  });
  
  // アプリケーションの初期化
  document.addEventListener('DOMContentLoaded', () => {
    const likeModel = new LikeModel();
    const likeButtonView = new LikeButtonView({ model: likeModel });
  });