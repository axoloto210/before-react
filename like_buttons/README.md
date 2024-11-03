## いいね Button
###　サーバーのsetup
`/like_buttons/like_button_api/`下で`pnpm start`などで起動。
Node.js サーバーの起動中はいいね数を保持できます。

###　機能
いいねボタンには以下の機能をつける。
#### ボタンの状態
- 処理中: `data-pending="true"`
- 処理成功（またはクリック前）: `data-pending="false"`
- 処理失敗: `data-pending="false" data-failed="true"`

#### クリック時の動作
サーバー側（`server.js`）でいいね数を保持します。
クリックするとサーバー側のいいね数が`1`増加し、その値をクライアント側で表示する。

初期値は`DOMContentLoaded`イベント後にAPIから取得します。

通信時にエラーが発生した場合には、ボタンを`"disabled"`とし、`"failed"`と表示する。