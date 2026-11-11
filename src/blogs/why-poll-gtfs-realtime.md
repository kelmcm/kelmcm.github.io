---
title: Why do we poll GTFS-Realtime Feeds?
date: 2026-11-11
excerpt: A few thoughts if you are wondering why polling is the generic strategy to access transit APIs. 
---

This past week, I’ve been learning the [GTFS (General Transit Feed Specification)]() data structures. I’m building a streaming data pipeline that will retrieve, transform, and display GTFS data from the [Montreal STM APIs](https://www.stm.info/a-propos/documents-donnees/donnees-ouvertes). What the full pipeline will look like is still to be determined, but the first step is to get access to the data!

I started with [transit-data.com](http://transit-data.comhttps//www.transit-data.com/gtfs-realtime-integration/decoding-gtfs-realtime-protobuf-feeds/polling-gtfs-realtime-feeds-efficiently/), a reference for building Python-based GTFS data tooling. And was [reading](https://www.transit-data.com/gtfs-realtime-integration/decoding-gtfs-realtime-protobuf-feeds/polling-gtfs-realtime-feeds-efficiently/) about how to **poll** a GTFS-Realtime Feed API. This surprised me. My mental model was that a real-time transit feed would automatically push data to any “subscriber” when the latest data was available, like a Websocket or Server-Sent Events.

So, why is this? Why do we have to poll a GTFS feed?

A quick Google search finds many blogs and articles weighing the pros and cons of data retrieval methods. A few takeaways in the context of transit data stuck out to me:

- **One-way communication** - Transit agencies do not need to receive any data from the clients that are pinging their API. They only need to update the data. An API creates a clear boundary between those who produce and consume the data.
- **Safety by separation** - There are no open connections that are accessing a Websocket and the transit agencies do not need to monitor which downstream clients are using their connection. Managing a dropped connection is more complicated than having stale data on an API endpoint.
- **Snapshots over incremental** - Each time an API is updated, the full snapshot of the data is overwritten. When a downstream consumer polls the updated data, they have the current of all vehicles at that specific moment. This simplifies downstream transformations, whether a consumer wants to simply overwrite with the latest data or track the state changes over time. With incremental data, consumers are responsible for overwriting select vehicles, rather than all.

With these in mind, the choice to poll GTFS-Realtime feeds seems overall safer and simpler.
