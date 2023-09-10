/** set-up routing */
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/** style global */
import GlobalStyle from "./components/global-style/global-style";

/** set-up redux */
// as ReduxProvider => dùng as: để đổi tên trên import
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/config-store";

// app để config dự án
export function App() {
  return (
    // tại sao không bọc ở đây. -> tại vì component có sử dụng hook của router nên component bắt buộc phải nằm trong phạm vi của router thì mới sử dụng hook của router dom được
    <ReduxProvider store={store}>
      <GlobalStyle>
        <RouterProvider router={router}></RouterProvider>
      </GlobalStyle>
    </ReduxProvider>
  );
}
