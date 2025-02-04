import { EventEmitter } from 'events';
import * as crypto from 'node:crypto';
import { EventTypes } from '../types';

export class EventManager extends EventEmitter {
  private static instance: EventManager;
  private static sessionId: string;
  private activeSessions: Map<string, any>;

  private constructor() {
    super();
    this.activeSessions = new Map();
  }

  static get shared(): EventManager {
    if (!this.instance) {
      this.instance = new EventManager();
    }
    return this.instance;
  }

  static get sessionIdentifier(): string {
    if (
      !this.sessionId ||
      !EventManager.shared.isSessionActive(this.sessionId)
    ) {
      this.sessionId = `${crypto.randomBytes(16).toString('hex')}-${Date.now()}`;
    }
    return this.sessionId;
  }

  startSession(sessionId: string) {
    if (!this.activeSessions.has(sessionId)) {
      this.activeSessions.set(sessionId, { events: [], active: true });
    }
  }

  endSession(sessionId: string) {
    if (this.activeSessions.has(sessionId)) {
      this.activeSessions.get(sessionId)!.active = false;
    }
  }

  storeEvent(sessionId: string, eventType: string, data: any) {
    if (!this.activeSessions.has(sessionId)) {
      this.startSession(sessionId);
    }
    this.activeSessions.get(sessionId)!.events.push({ eventType, data });
  }

  isSessionActive(sessionId: string): boolean {
    return this.activeSessions.get(sessionId)?.active ?? false;
  }
}

const eventManager = EventManager.shared;

const trackEvent =
  (eventType: string) => (data: { sessionId: string; [key: string]: any }) => {
    eventManager.storeEvent(data.sessionId, eventType, data);
    if (eventType === EventTypes.RES) {
      eventManager.endSession(data.sessionId);
    }
  };

[
  EventTypes.REQ,
  EventTypes.RES,
  EventTypes.FUNCTION_CALL,
  EventTypes.MIDDLEWARE_CALL,
  EventTypes.REQ_MODIFIED,
  EventTypes.RES_MODIFIED,
].forEach((eventType) => {
  eventManager.on(eventType, trackEvent(eventType));
});

export default eventManager;
