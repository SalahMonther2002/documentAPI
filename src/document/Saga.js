import { takeEvery, call, put, takeLatest, take } from 'redux-saga/effects';
import { setContent,loadContent } from './Slice';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const socket = io("https://documentapi-3eqb.onrender.com");

function* handleSocketConnection() {

    // socket.on("receive-changes", document => {
    //   dispatch(setContent(document));
    // });

    // return () => {
    //   socket.disconnect();
    // };

  yield call(() => new Promise((resolve) => {
    socket.on('connect', resolve);
  }));
}

function createSocketChannel(eventName) {
  return eventChannel(emitter => {
    const handler = (data) => emitter(data);
    socket.on(eventName, handler);
    return () => {
      socket.off(eventName, handler);
    };
  });
}

function* handleReceive() {
  const channel = yield call(createSocketChannel, 'receive-changes');
  while (true) {
    const message = yield take(channel);
    yield put(loadContent(message));
  }
}

function* handleSendChange(action) {
  // console.log("qwdwqdqsaasa");
  yield call([socket, 'emit'], 'send-changes', action.payload);
}

function* watchEditDocument() {
  yield takeEvery('document/initiateSocket', handleSocketConnection);
  yield takeEvery('document/initiateSocket', handleReceive);
  yield takeLatest(setContent.type, handleSendChange);
}

export default function* documentSaga() {
  yield watchEditDocument();
}
