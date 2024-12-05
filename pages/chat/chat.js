Page({
  data: {
    inputMessage: '',
    aiResponse: '',
    lastUserMessage: '',
    loading: false,
    scrollToView: ''
  },

  onInputChange(e) {
    this.setData({
      inputMessage: e.detail.value
    })
  },

  sendMessage() {
    if (!this.data.inputMessage.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    const userMessage = this.data.inputMessage
    this.setData({ 
      loading: true,
      lastUserMessage: userMessage
    })

    // 调用coze API
    wx.request({
      url: '你的COZE_API_地址',
      method: 'POST',
      data: {
        message: userMessage
      },
      success: (res) => {
        this.setData({
          aiResponse: res.data.result,
          inputMessage: '',
          scrollToView: 'lastMessage'
        })
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
        console.error('请求失败：', error)
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  }
}) 